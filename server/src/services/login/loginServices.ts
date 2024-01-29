import bcrpyt from 'bcrypt'
import { UserCredModel } from "../../db/models/userCredModel";
import { ValidationError } from "../../utils/custom/customError";
import Token_Utitlity from "../../utils/token/tokenGenerator";
import { loginSchema } from "../../utils/validation/schemas/dataObj";
import { ValidationResult } from '../../utils/interface/jodResullt';

const tokenService = new Token_Utitlity();


interface dataValueObj {
    dataValues: {
        id: number,
        user_email: string,
        user_password: string;
    }
}

class loginController {
    private async checkUserCred(email: string, password: string): Promise<object> {
        const validateData: ValidationResult = loginSchema.validate({ email, password });

        if (validateData.error) {
            throw new ValidationError(validateData.error.message);
        } else {
            try {
                const result: dataValueObj | null = await UserCredModel.findOne({
                    where: {
                        user_email: email,
                    },
                })

                if (result != null) {

                    const hashPassowrd: string = result.dataValues?.user_password;

                    const bcrpytCompare: boolean = await bcrpyt.compare(password, hashPassowrd);


                    if (bcrpytCompare) {
                        const id: number = result.dataValues.id;
                        const userEmail: string = result.dataValues.user_email;

                        if (id !== undefined && userEmail !== undefined) {
                            const accessToken: string = await tokenService.getToken({ id, user_email: userEmail });
                            return { status: true, token: accessToken };
                        } else {
                            throw new Error('User id or email not found');
                        }
                    }
                    else {
                        return { status: false, message: 'Invalid User Credential' };
                    }

                } else {
                    return { status: false, message: 'User Not Found' };
                }
            } catch (error) {
                console.error('Error checking user credentials:', error);
                return new Error('Error checking user credentials');
            }
        }
    }

    public async getUserCred(data: { email: string; password: string }): Promise<object> {
        try {
            const result = await this.checkUserCred(data.email, data.password);
            return result;
        } catch (error) {
            console.error('Error getting user credentials:', error);
            throw new Error('Error getting user credentials');
        }
    }
}

export { loginController };
