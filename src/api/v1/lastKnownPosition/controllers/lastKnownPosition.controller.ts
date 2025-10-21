import { Request, Response } from "express";
import { AuthRequest } from "../../../../interfaces/auth.interface";
import { GetUnitByName, getUnitByVin } from "../interfaces/lastKnownPosition.interface";
import { getSecret } from "../../../../services/aws/getSecrets";
import { executeReportFlow } from "../../../../services/wialon/reportFlow";
import { getSid } from "../../../../services/wialon/getSid";
import { getTemplateId } from "../../../../services/wialon/getTemplateId";
import { getUnitId } from "../../../../services/wialon/getUnitId";

const getUnitLastKnownPositionHandler = async (
    req: AuthRequest & { params: Record<string, string> },
    res: Response,
    searchMode: "vin" | "name",
    paramKey: string
) => {
    try {
        const ref = req.user?.ref;
        const searchValue = req.params[paramKey];

        const { token, resourceId } = await getSecret(`prod/wialon/env-${ref}`);
        const sid = await getSid(token);
        const templateId = await getTemplateId("webservice_lastPos_apiv2", Number(resourceId), sid);

        const unitId = await getUnitId(searchValue, searchMode, sid);
        const data = await executeReportFlow(sid, resourceId, String(templateId), String(unitId));

        res.status(200).json({ data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

export const getUnitVinLastKnownPosition = (req: AuthRequest & { params: { vin: string } }, res: Response) =>
    getUnitLastKnownPositionHandler(req, res, "vin", "vin");

export const getUnitNameLastKnownPosition = (req: AuthRequest & { params: { name: string } }, res: Response) => 
    getUnitLastKnownPositionHandler(req, res, "name", "name");