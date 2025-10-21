import { Router } from "express";
import { getUnitNameLastKnownPosition, getUnitVinLastKnownPosition } from "../controllers/lastKnownPosition.controller";

const lastKnownPositionRouter = Router();

lastKnownPositionRouter.get('/lastKnownPosition/vin/:vin', getUnitVinLastKnownPosition);
lastKnownPositionRouter.get('/lastKnownPosition/name/:name', getUnitNameLastKnownPosition);

export default lastKnownPositionRouter;