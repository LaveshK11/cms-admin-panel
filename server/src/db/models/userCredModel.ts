import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeInstance } from "../dbConnect";

interface UserAttributes {
    id: number;
    user_email: string;
    user_password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

export interface UserModel extends Model<UserAttributes, UserCreationAttributes>, UserAttributes { }

export const UserCredModel = sequelizeInstance.define<UserModel>('user_cred', {
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
    }
})


UserCredModel.sync()
