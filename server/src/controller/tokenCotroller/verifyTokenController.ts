import { NextFunction, Response, Request } from "express"
import Token_Utility from "../../utils/token/tokensUtility";

const tokenServices = new Token_Utility()
export async function VerifyAccessToken(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {

        let result = await tokenServices.verifyToken(req.cookies.A_T)

        res.status(200).json(result);

    } catch (error) {
        next(error);
        }
}
