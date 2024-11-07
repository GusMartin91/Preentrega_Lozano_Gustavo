import mongoose from "mongoose";
import winstonLogger from '../utils/winston.utils.js';

export class MongoDB {
    static #connection = null;

    static async connect(url, db) {
        if (this.#connection) {
            winstonLogger.info(`Database connection already established`);
            return this.#connection;
        }

        try {
            this.#connection = await mongoose.connect(url, { dbName: db });
            winstonLogger.info(`Database connection successfully established on ${db}`);
            return this.#connection;
        } catch (error) {
            winstonLogger.error(`Failed to connect to the database: ${error.message}`);
            process.exit(1);
        }
    }
}
