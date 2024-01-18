import { NextFunction, Response, Request } from "express"
import { loginController } from "../../services/login/loginServices";


const loginProcess = new loginController()

export async function userLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

        let result = await loginProcess.getUserCred(req.body)


        res.status(200).json(result);
    } catch (error) {
        next(error);
    }
}
