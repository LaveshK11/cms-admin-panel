import bcrypt from 'bcrypt';
import Token_Utility from '../../../utils/token/tokensUtility';
import { UserModel } from "../../../db/models/UserModel";
import { BadRequest, ServerError, ValidationError } from "../../../utils/custom/customError";
import { loginSchema } from "../../../utils/validation/schemas/dataObj";
import { ValidationResult } from '../../../utils/interface/jodResult';
import { RoleModel } from '../../../db/models/RoleMode';
import { PermissionModel } from '../../../db/models/PermissionModel';
import redisClient from '../../../db/redis/redisConnect';

const tokenService = new Token_Utility();

class loginServices {

    private async checkUserCred(user_email: string, user_password: string): Promise<object> {

        const validateData: ValidationResult = loginSchema.validate({ user_email, user_password });

        if (validateData.error) {
            throw new ValidationError(validateData.error.message); // Throw ValidationError
        } else {
            const result: any = await UserModel.findOne({
                where: {
                    user_email: user_email,
                },
                include: [
                    {
                        model: RoleModel,
                        include: [
                            {
                                model: PermissionModel,
                                attributes: {
                                    exclude: ['createdAt', 'updatedAt']
                                }
                            }
                        ],
                        attributes: {
                            exclude: ['createdAt', 'updatedAt']
                        }
                    }
                ],
                attributes: {
                    exclude: ['createdAt', 'updatedAt']
                },
                raw: true
            });

            if (result != null) {
                const hashPassword: string = result.user_password;
                const bcryptCompare: boolean = await bcrypt.compare(user_password, hashPassword);

                if (bcryptCompare) {
                    const id: number = result.id;
                    const userEmail: string = result.user_email;

                    if (id !== undefined && userEmail !== undefined) {
                        const accessToken: string = await tokenService.getToken({ id, user_email: userEmail });
                        await redisClient.set(userEmail.toString(), JSON.stringify(result));
                        return { status: true, token: accessToken };
                    } else {
                        throw new ValidationError('User id or email not found');
                    }
                } else {
                    throw new ValidationError('Invalid credentials');
                }

            } else {
                throw new ValidationError('User Not Found');
            }
        }
    }

    public async getUserCred(data: { email: string; password: string }): Promise<object> {
        const result = await this.checkUserCred(data.email, data.password);
        return result;
    }
}

export { loginServices };
