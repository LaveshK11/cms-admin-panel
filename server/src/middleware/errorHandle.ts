import { Request, Response, NextFunction } from 'express';
/**
 * Middleware to handel error.
 * @param req Express request object.
 * @param res Express response object.
 */
export function errorHandler(err: any, req: Request, res: Response, next: NextFunction): void {
    const statusCode: number = err.statusCode || 500;
    res.status(statusCode).json(err);
}