import { Router } from "express";
import { getUnitLastKnownPosition } from "../controllers/lastKnownPosition.controller";

const lastKnownPositionRouter = Router();

lastKnownPositionRouter.get('/lastKnownPosition/:unitVin', getUnitLastKnownPosition);

export default lastKnownPositionRouter;