import sequelizeInstance from "@/config/database/dbConnect";
import { DataTypes, Model, Optional, ModelAttributes } from "sequelize";

interface TeamAttributes {
    id: number;
    name: string;
    position: string;
    department: string;
    specialisation: string;
    image: string;
    social_media: string;
    about: string;
    language: string;
    data_time: Date;
}

interface TeamCreationAttributes extends Optional<TeamAttributes, 'id'> { }

export interface TeamModel extends Model<TeamAttributes, TeamCreationAttributes>, TeamAttributes { }

const Team = sequelizeInstance.define<TeamModel>('team', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    position: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    department: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    specialisation: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
    },
    social_media: {
        type: DataTypes.STRING,
    },
    about: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    language: {
        type: DataTypes.STRING,
    },
    data_time: {
        type: DataTypes.DATE,
        allowNull: false, // Make it required if needed
    }
}, {
    timestamps: true
})

Team.sync({ alter: true });

export default Team