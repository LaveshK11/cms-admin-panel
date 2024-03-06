import { ValidationResult } from './../../utils/interface/jodResult';
import { PermissionAttributes, PermissionModel } from "../../db/models/PermissionModel";
import { PermissionFormSchema } from "./../../utils/validation/schemas/dataObj";
import { ServerError, ValidationError } from './../../../src/utils/custom/customError';

class Permission_Services {

    constructor() { }


    private async createOperation(data: PermissionAttributes): Promise<object> {

        const alreadyExist: boolean = await this.permissionAlreadyExist(data.permission_setName);

        if (alreadyExist) return { status: false, message: "Permission set already present" }

        const result: PermissionModel | null = await PermissionModel.create(data);

        if (result) {
            return { status: true, message: "Permission created successfully" };
        }
        else {
            throw new ServerError("Failed to create new permission");
        }
    }

    private async permissionAlreadyExist(permission_setName: PermissionAttributes["permission_setName"]): Promise<boolean> {

        const alreadyExist: object | null = await PermissionModel.findOne({ where: { permission_setName: permission_setName } });

        if (alreadyExist) return true

        else return false

    }


    public async getAllPermissions(): Promise<object> {

        let result: PermissionModel[] = await PermissionModel.findAll({})

        if (result.length) {
            return { data: result, status: true }
        }
        else {
            return { data: [], status: false }
        }
    }

    public async createNewPermission(data: PermissionAttributes): Promise<object> {

        const validateData: ValidationResult = PermissionFormSchema.validate(data)

        if (validateData.error?.message) {
            throw new ValidationError(validateData.error?.message)
        }

        const result = await this.createOperation(data)
        return result
    }

}

export default Permission_Services;