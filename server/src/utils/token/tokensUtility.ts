import jwt from "jsonwebtoken";
import { BadRequest, ServerError } from "../custom/customError";



class Token_Utility {

    privateKey: string = "usernae";

    constructor() { }

    private async getSignToken(data: { id: number; user_email: string }): Promise<string> {
        try {
            const token: string = await jwt.sign({ id: data.id, user_email: data.user_email }, this.privateKey, { expiresIn: '4s' });
            return token;
        } catch (error) {
            throw new ServerError();
        }
    }

    public async getToken(data: { id: number; user_email: string }): Promise<string> {
        try {
            const result: string = await this.getSignToken(data);
            return result;
        } catch (error) {
            throw new ServerError();
        }
    }


    public async verifyToken(token: string): Promise<object> {
        try {
            const obj = await jwt.verify(token, this.privateKey);
            return { obj }
        } catch (error) {
            return new BadRequest();
        }
    }

}

export default Token_Utility