import dotenv from 'dotenv';
dotenv.config();

const DEFAULT_PORT = 3030;

class AppConfig {
    get port () {
        return Number(process.env.PORT) || DEFAULT_PORT;
    }
    get host () {
        return process.env.HOST || 'localhost';
    }
    get db () {
        return {
            dbName: process.env.DB_NAME,
            dbUrl: process.env.DB_URL,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
        }
    }
}

export const appConfig = new AppConfig();