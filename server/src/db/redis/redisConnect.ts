import { redisConfig } from './../../config/dbConfig';
import * as redis from "redis"

const config = {
    socket: {
        port: redisConfig.PORT,
        host: redisConfig.HOST,
    },
    legacy: true
};

const redisClient = redis.createClient(config);


export async function redisConnect(): Promise<void> {
    try {
        (async () => {
            await redisClient.connect();
        })();

        redisClient.on("connect", () => {
            console.log("Redis Connected!");
        });

        redisClient.on("error", (err) => {
            console.log(`Error:${err}`);
        });

        process.on("SIGINT", () => {
            redisClient.quit();
            console.log("redis client quit");
        });

    } catch (e) {
        console.error(e);
    }
}

export default redisClient;
