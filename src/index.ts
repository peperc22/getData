import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import lastKnownPositionRouter from './api/v1/lastKnownPosition/routes/lastKnownPosition.routes';
import { verifyJwt } from './middleware/verifyJwt';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(verifyJwt);

app.use('/v1', lastKnownPositionRouter);

app.listen(PORT, () => {
    console.log(`Server up on http://localhost:${PORT}`);
})