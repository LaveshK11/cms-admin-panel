import { NextFunction, Response, Request } from "express"
import signupService from "../../services/authServices/signup/singupService";

const signupProcess = new signupService()

export async function createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const result: any = await signupProcess.addUser(req.body)

        console.log(result)

        res.json(result);

    } catch (error) {
        next(error);
    }
}
