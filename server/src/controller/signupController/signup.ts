import { NextFunction, Response, Request } from "express"
import signupService from "../../services/authServices/signup/singupService";

const signupProcess = new signupService()
export async function userSignup(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

        const result: object = await signupProcess.addUser(req.body)

        res.status(200).json(result);

    } catch (error) {
        next(error);
    }
}
