import { Response, NextFunction } from 'express';
import { AuthorizationError, ServerError } from '../utils/custom/customError';
import redisClient from '../db/redis/redisConnect';
import { CustomRequest } from 'src/utils/interface/customRequest';

/**
 * Middleware to validate user permissions.
 * @param req Express request object.
 * @param res Express response object.
 * @param next Express next function.
 */
export async function validatePermission(req: CustomRequest, res: Response, next: NextFunction): Promise<void> {
    try {
        // Whitelist public endpoints
        const publicEndpoints = [
            '/api/v1/login',
            '/api/v1/token/verify-accessToken',
            '/api/v1/permission/getAllPermission',
            '/api/v1/role/createRoles',
            '/api/v1/role/getAllRoles',
            "/api/v1/create_user",
            "/api/v1/permission/createPermission",
            "/api/v1/role/deleteRoles/"
        ];

        if (publicEndpoints.includes(req.path)) {
            return next();
        }

        const accessToken: string | undefined = req.cookies.A_T;
        if (!accessToken) {
            return next(new AuthorizationError("Unauthorized"));
        }

        const userData: string | null = await redisClient.get(req.payload.user_email);
        if (!userData) {
            return next(new AuthorizationError("User data not found"));
        }

        const parsedUserData = JSON.parse(userData);


        const endpoint = req.path.split('/').pop();

        const allowedPermission = parsedUserData[`Role.Permission.${endpoint}`];
        if (allowedPermission) {
            next();
        } else {
            next(new AuthorizationError("You don't have permission to access this feature"));
        }
    } catch (error) {
        console.error("Error in permission validation:", error);
        next(new ServerError("Internal Server Error"));
    }
}
