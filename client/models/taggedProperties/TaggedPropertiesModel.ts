import { DataTypes, Model, Optional } from 'sequelize';
import sequelizeInstance from '@/lib/database/dbConnect';

// Define attributes for the model
interface UserAttributes {
    id: number;
    type: string;
    Property_Ref_No: string;
}

// Define attributes that can be null when creating a new instance
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

// Define the model
export interface TaggesPropertiesModel
    extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes { }

const TaggesPropertiesModel = sequelizeInstance.define<TaggesPropertiesModel>('tagged_properties', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    type: {
        type: DataTypes.STRING,
    },
    Property_Ref_No: {
        type: DataTypes.STRING,

    },
});

TaggesPropertiesModel.sync();

export default TaggesPropertiesModel;
