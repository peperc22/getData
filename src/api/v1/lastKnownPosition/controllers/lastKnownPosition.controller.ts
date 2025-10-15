import { Request, Response } from "express";
import { AuthRequest } from "../../../../interfaces/auth.interface";
import { getUnitByName } from "../interfaces/lastKnownPosition.interface";
import { getSecret } from "../../../../services/aws/getSecrets";
import { executeReportFlow } from "../../../../services/wialon/reportFlow";
import { getSid } from "../../../../services/wialon/getSid";

export const getUnitLastKnownPosition = async (req: AuthRequest & { params: getUnitByName }, res: Response) => {
    try {
        const ref = req.user?.ref;
        const { unitName } = req.params;

        const { token, resourceId, objectId } = await getSecret(`prod/wialon/env-${ref}`);
        const sid = await getSid(token);

        const data = executeReportFlow(sid, resourceId, objectId);

        res.status(200).json({ message: 'Last Known Pos' });
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}