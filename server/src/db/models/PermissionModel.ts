import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeInstance } from "../dbConnect";

export interface PermissionAttributes {
    permission_setName: string,
    create_user: boolean,
    delete_user: boolean,
    createRoles: boolean,
    getAllPermission: boolean,
    createPermission: boolean,
}


export interface PermissionModel extends Model<PermissionAttributes>, PermissionAttributes { }

export const PermissionModel = sequelizeInstance.define<PermissionModel>('Permission', {

    permission_setName: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
    },
    create_user: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    delete_user: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    createRoles: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    getAllPermission: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    createPermission: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    }
})



PermissionModel.sync()
