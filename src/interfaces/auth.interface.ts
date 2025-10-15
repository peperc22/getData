import { Request } from "express";

export interface AuthUser {
    id: string,
    name: string;
    ref: string,
    iat: number, // Token expiration time
    exp: number, // Token issued at time
}

export interface AuthRequest extends Request {
    user?: AuthUser;
}