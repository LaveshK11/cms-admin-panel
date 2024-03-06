import { DataTypes, Model } from "sequelize";
import { sequelizeInstance } from "../dbConnect";
import { PermissionModel } from "./PermissionModel";

export interface RoleAttributes {
    role_name: string
    permission_set: string,
}


export interface RoleModelAttributes extends Model<RoleAttributes>, RoleAttributes { }

export const RoleModel = sequelizeInstance.define<RoleModelAttributes>('Roles', {
    role_name: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    permission_set: {
        type: DataTypes.STRING,
        allowNull: true
    }
})


RoleModel.belongsTo(PermissionModel, {
    foreignKey: "permission_set",
    targetKey: "permission_setName",
    onUpdate: 'CASCADE',
    onDelete: 'NO ACTION'
})


RoleModel.sync()
