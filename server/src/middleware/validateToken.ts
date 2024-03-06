import { Response, NextFunction } from 'express';
import { AuthorizationError } from '../utils/custom/customError';
import { CustomRequest } from 'src/utils/interface/customRequest';
import Token_Utility from '../utils/token/tokensUtility';
import jwt from "jsonwebtoken";

// Define a new interface that extends the existing Request interface


/**
 * Middleware to validate user .
 * @param req Express request object.
 * @param res Express response object.
 * @param next Express next function.
 */

const tokenUtility = new Token_Utility();

export async function validate(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {

        if (req.path === '/api/v1/login' || req.path === '/api/v1/token/verify-accessToken') {
            return next();
        }
        const authToken: string | undefined = req.cookies.A_T;
        if (!authToken) {
            return next(new AuthorizationError("Unauthorized"));
        }

        const data: jwt.JwtPayload = await tokenUtility.verifyToken(authToken);

        req.payload = data.obj;

        if (data && data.status === true) {
            return next();
        } else {
            next(new AuthorizationError("Unauthorized User"));
        }
    } catch (error) {
        return next(new AuthorizationError("Unauthorized"));
    }
}
