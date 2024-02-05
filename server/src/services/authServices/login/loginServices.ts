import bcrypt from 'bcrypt'
import Token_Utility from '../../../utils/token/tokensUtility';
import { UserCredModel } from "../../../db/models/userCredModel";
import { BadRequest, ValidationError } from "../../../utils/custom/customError";
import { loginSchema } from "../../../utils/validation/schemas/dataObj";
import { ValidationResult } from '../../../utils/interface/jodResult';

const tokenService = new Token_Utility();


interface dataValueObj {
    dataValues: {
        id: number,
        user_email: string,
        user_password: string;
    }
}

class loginServices {
    
    private async checkUserCred(user_email: string, user_password: string): Promise<object> {
        const validateData: ValidationResult = loginSchema.validate({ user_email, user_password });

        if (validateData.error) {
            return new ValidationError(validateData.error.message);
        } else {
            try {
                const result: dataValueObj | null = await UserCredModel.findOne({
                    where: {
                        user_email: user_email,
                    },
                })

                if (result != null) {

                    const hashPassword: string = result.dataValues?.user_password;

                    const bcryptCompare: boolean = await bcrypt.compare(user_password, hashPassword);

                    if (bcryptCompare) {
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
                return new BadRequest('Error while checking user credentials');
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

export { loginServices };
