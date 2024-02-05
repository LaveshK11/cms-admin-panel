import bcrypt from 'bcrypt'
import { ValidationResult } from '../../../utils/interface/jodResult';
import { UserAttributes, UserCredModel, UserModel } from "../../../db/models/userCredModel";
import { registrationSchema } from '../../../utils/validation/schemas/dataObj';
import { BadRequest, ServerError, ValidationError } from '../../../utils/custom/customError';

class signupService {

    private async createOperation(data: UserAttributes): Promise<object> {
        try {

            const validateData: ValidationResult = registrationSchema.validate(data);

            if (validateData.error) return new ValidationError(validateData.error.message)


            const result: object | null = await UserCredModel.findOne({
                where: {
                    user_email: data.user_email,
                },
            })

            if (result != null) return { status: false, message: "User already exist" }

            const saltRounds: number = 10;

            const myPlaintextPassword: string = data.user_password;

            const salt = await bcrypt.genSalt(saltRounds);

            const hash = await bcrypt.hash(myPlaintextPassword, salt);

            data.user_password = hash;

            const dataOperation: UserModel = await UserCredModel.create(data)

            if (dataOperation) return { status: true, message: "User saved successfully" }


        } catch (error) {
            console.log(error)
            return new BadRequest("Error while saving user")
        }

        return {}
    }

    public async addUser(data: UserAttributes): Promise<object> {

        try {

            const result: object = await this.createOperation(data)

            return result

        } catch (error) {

            return new ServerError()
        }

    }


}

export default signupService