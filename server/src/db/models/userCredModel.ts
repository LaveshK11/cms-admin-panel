import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeInstance } from "../dbConnect";

export interface UserAttributes {
    id: number;
    user_email: string;
    user_password: string;
    user_name: string,
    user_role: string,
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

export interface UserModel extends Model<UserAttributes, UserCreationAttributes>, UserAttributes { }

export const UserCredModel = sequelizeInstance.define<UserModel>('Users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    user_email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    user_password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    user_role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "user"
    }
})

UserCredModel.sync({ alter: true, force: true })
