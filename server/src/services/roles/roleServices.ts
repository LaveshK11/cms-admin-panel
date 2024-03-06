import { ServerError, ValidationError } from "../../utils/custom/customError";
import { PermissionModel } from "../../db/models/PermissionModel";
import { RoleAttributes, RoleModel } from "../../db/models/RoleMode";
import { ValidationResult } from "../../utils/interface/jodResult";
import { RoleFormSchema } from "../../utils/validation/schemas/dataObj";
import { UserModel } from "../../db/models/UserModel";

class RolesService {

    constructor() { }

    private async addRoleOperation(data: RoleAttributes): Promise<object> {
        const roleExists: boolean = await this.checkExistingRole(data.role_name);

        if (roleExists) {
            return { status: false, message: "Role name already exists. Please choose another name." };
        }

        const result = await RoleModel.create(data);

        if (result !== null) {
            return { status: true, message: "Role added successfully" };
        } else {
            throw new ServerError("Error while saving role");
        }

    }

    private async checkExistingRole(roleName: string): Promise<boolean> {
        const result: RoleAttributes | null = await RoleModel.findOne({ where: { role_name: roleName } });
        return result !== null;
    }

    private async roleInUse(roleName: string): Promise<boolean> {

        const count: number = await UserModel.count({ where: { user_role: roleName } })

        if (count > 0) return true

        return false
    }

    private async deleteOperation(roleName: string): Promise<object> {

        const roleInUse: boolean = await this.roleInUse(roleName)

        if (roleInUse) throw new ValidationError("Please remove this role from any assigned users before proceeding.")

        const result: number = await RoleModel.destroy({ where: { role_name: roleName } })

        if (result > 0) return { status: true, message: "Role deleted successfully" }

        return { status: false, message: "Role not found" }

    }

    public async deleteRole(roleName: string) {

        const result: object = await this.deleteOperation(roleName);

        return result
    }

    public async getAllRoles(): Promise<object> {
        const roles = await RoleModel.findAll({
            include: [{
                model: PermissionModel
            }]
        });

        return { data: roles, status: roles.length > 0 };

    }

    public async addRole(data: RoleAttributes): Promise<object> {

        const validationResult: ValidationResult = RoleFormSchema.validate(data);

        if (validationResult.error) {
            throw new ValidationError(validationResult.error.message);
        }

        const result: object = await this.addRoleOperation(data);
        return result;

    }
}

export default RolesService;
