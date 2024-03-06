import bcrypt from 'bcrypt';
import { ValidationResult } from '../../../utils/interface/jodResult';
import { UserAttributes, UserModel } from "../../../db/models/UserModel";
import { registrationSchema } from '../../../utils/validation/schemas/dataObj';
import { ServerError, ValidationError } from '../../../utils/custom/customError';

class SignupService {

    private async createOperation(data: UserAttributes): Promise<object> {
        const validateData: ValidationResult = registrationSchema.validate(data);

        if (validateData.error) {
            throw new ValidationError(validateData.error.message);
        }

        const existingUser = await UserModel.findOne({
            where: {
                user_email: data.user_email,
            },
        });

        if (existingUser) {
            return { status: false, message: "User already exists" };
        }

        const saltRounds: number = 10;

        const myPlaintextPassword: string = data.user_password;

        const salt = await bcrypt.genSalt(saltRounds);

        const hash = await bcrypt.hash(myPlaintextPassword, salt);

        data.user_password = hash;

        const createdUser: UserModel | null = await UserModel.create(data);

        if (createdUser) {
            return { status: true, message: "User saved successfully" };
        } else {
            throw new ServerError("Failed to create user");
        }
    }

    public async addUser(data: UserAttributes): Promise<object> {
        const result: object = await this.createOperation(data);
        return result;
    }
}

export default SignupService;
