import { NextFunction, Response, Request } from "express"
import { loginServices } from "../../services/authServices/login/loginServices";


const loginProcess = new loginServices()

export async function userLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

        let result: any = await loginProcess.getUserCred(req.body)

        if (result.token) {
            res.cookie('A_T', result.token, {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
            });
        }
        res.json(result);
    } catch (error) {
        next(error);
    }
}
