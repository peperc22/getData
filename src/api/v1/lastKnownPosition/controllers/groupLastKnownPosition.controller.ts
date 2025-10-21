import { Request, Response } from "express";
import { AuthRequest } from "../../../../interfaces/auth.interface";
import { getSecret } from "../../../../services/aws/getSecrets";
import { getSid } from "../../../../services/wialon/getSid";
import { getTemplateId } from "../../../../services/wialon/getTemplateId";
import { getUnitId } from "../../../../services/wialon/getUnitId";
import { executeReportFlow } from "../../../../services/wialon/reportFlow";

export const getGroupLastKnownPositionHandler = async (
    req: AuthRequest & { params: string },
    res: Response,
) => {
    try {
        const ref = req.user?.ref;
        const group = req.params.group;

        const { token, resourceId, objectId } = await getSecret(`prod/wialon/env-${ref}`);
        const sid = await getSid(token);

        const groupId = await getUnitId(group, "group", sid);        
        const templateId = await getTemplateId("webservice_lastPos_apiv2", Number(resourceId), sid);

        const data = await executeReportFlow(sid, resourceId, String(templateId), objectId, "group");

        res.status(200).json({ data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}