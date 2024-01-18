import { Sequelize } from "sequelize";
import { databaseConfig } from "../config/dbConfig";



export const sequelizeInstance = new Sequelize(
    databaseConfig.DB,
    databaseConfig.User,
    databaseConfig.Password,
    {
        host: databaseConfig.Host,
        dialect: databaseConfig.dialect,
        logging: false,
        pool: {
            max: databaseConfig.pool.max,
            min: databaseConfig.pool.min,
            acquire: databaseConfig.pool.acquire,
            idle: databaseConfig.pool.idle
        },
    }
);


