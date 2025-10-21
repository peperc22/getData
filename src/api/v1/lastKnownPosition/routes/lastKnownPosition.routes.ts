import { Router } from "express";
import { getUnitNameLastKnownPosition, getUnitVinLastKnownPosition } from "../controllers/lastKnownPosition.controller";
import { getGroupLastKnownPositionHandler } from "../controllers/groupLastKnownPosition.controller";

const lastKnownPositionRouter = Router();

lastKnownPositionRouter.get('/lastKnownPosition/vin/:vin', getUnitVinLastKnownPosition);
lastKnownPositionRouter.get('/lastKnownPosition/name/:name', getUnitNameLastKnownPosition);
lastKnownPositionRouter.get('/lastKnownPosition/group/:group', getGroupLastKnownPositionHandler);

export default lastKnownPositionRouter;