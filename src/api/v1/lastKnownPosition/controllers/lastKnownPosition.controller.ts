import { Request, Response } from "express";
import { AuthRequest } from "../../../../interfaces/auth.interface";
import { getUnitByVin } from "../interfaces/lastKnownPosition.interface";
import { getSecret } from "../../../../services/aws/getSecrets";
import { executeReportFlow } from "../../../../services/wialon/reportFlow";
import { getSid } from "../../../../services/wialon/getSid";
import { getTemplateId } from "../../../../services/wialon/getTemplateId";
import { getUnitId } from "../../../../services/wialon/getUnitId";

export const getUnitLastKnownPosition = async (req: AuthRequest & { params: getUnitByVin }, res: Response) => {
    try {
        const ref = req.user?.ref;
        const { vin } = req.params;
        
        const { token, resourceId, objectId } = await getSecret(`prod/wialon/env-${ref}`);
        const sid = await getSid(token);
        
        const templateId = await getTemplateId('webservice_lastPos_apiv2', Number(resourceId), sid);
        
        const unitId = await getUnitId(vin, sid);
        const data = await executeReportFlow(sid, resourceId, String(templateId), String(unitId));

        res.status(200).json({ data });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}