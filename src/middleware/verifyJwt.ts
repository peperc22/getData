import { NextFunction, Response } from "express";
import jwt from 'jsonwebtoken';
import { AuthRequest, AuthUser } from "../interfaces/auth.interface";
import { getSecret } from "../services/aws/getSecrets";

export const verifyJwt = async (req: AuthRequest, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) return res.status(401).json({ error: 'Missing authorization header' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Invalid authorization header format' });

    try {
        const { JWT_SECRET_DBHANDLER } = await getSecret('prod/db/JWT');
        const decoded = jwt.verify(token, JWT_SECRET_DBHANDLER) as AuthUser;
        const now = Math.floor(Date.now() / 1000);

        if (decoded.exp && decoded.exp < now) return res.status(401).json({ error: 'Token expired' });

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid token' });
    }
}