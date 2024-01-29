import { Request, Response, NextFunction } from 'express';
import { AuthorizationError } from '../utils/custom/customError';
import Token_Utitlity from '../utils/token/tokensUtility';
const tokenService = new Token_Utitlity()
export async function validate(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        if (req.path === '/api/v1/login' || req.path === '/api/v1/login') {
            return next();
        }
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            next(new AuthorizationError("Unauthorized"));
        }
        next()
    } catch (error) {
        throw new AuthorizationError()
    }
}

