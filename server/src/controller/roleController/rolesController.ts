import { NextFunction, Response, Request } from "express"
import Roles_Services from "../../services/roles/roleServices";


const rolesServices = new Roles_Services()

export async function getAllExistingRole(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const result: object = await rolesServices.getAllRoles()

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}


export async function createNewRoles(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const result: object = await rolesServices.addRole(req.body)

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }

}

export async function deleteRole(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        
        const roleName = req.query.roleName as string

        const result: object = await rolesServices.deleteRole(roleName)

        res.status(200).json(result);
    } catch (error) {
        next(error);
    }

}