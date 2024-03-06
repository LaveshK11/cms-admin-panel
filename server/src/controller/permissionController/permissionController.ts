import { NextFunction, Response, Request } from "express"
import Permission_Services from "../../services/permission/permissionServices";


const permissionService = new Permission_Services()

export async function getAllExistingPermissions(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const result: object = await permissionService.getAllPermissions()

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}

export async function createNewPermission(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const result: object = await permissionService.createNewPermission(req.body);
        res.status(200).json(result);
    }
    catch (error) {
        next(error);
    }
}