import { Dialect } from 'sequelize';

interface DatabaseInterface {
    DB: string;
    User: string;
    Password: string;
    Host: string;
    dialect?: Dialect; // Make sure it is Dialect or undefined
    pool: {
        max: number;
        min: number;
        acquire: number;
        idle: number;
    };
}


export const databaseConfig: DatabaseInterface = {
    DB: 'adminPanel',
    User: 'root',
    Password: '',
    Host: '127.0.0.1',
    dialect: 'mysql' as Dialect, // Cast the string to Dialect
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};
