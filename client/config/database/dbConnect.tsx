import { Sequelize } from "sequelize";
import { databaseConfig } from "../dbConfig";

const sequelizeInstance = new Sequelize(
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

export default sequelizeInstance;

export async function initializeDatabase() {
  try {
    console.log('Connection to the database has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

initializeDatabase();
