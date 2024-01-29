import { NextFunction, Response, Request } from "express"
import { loginController } from "../../services/login/loginServices";


const loginProcess = new loginController()

export async function userLogin(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

        console.log(req.body)
        let result: any = await loginProcess.getUserCred(req.body)

        res.cookie('A_T', result.token, {
            httpOnly: true, 
            secure: true, 
            sameSite: 'strict', 
        });

        res.status(200).json({ status: result.status });
    } catch (error) {
        next(error);
    }
}
