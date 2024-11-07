import dotenv from "dotenv";

const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.development";
dotenv.config({ path: envFile });

export const config = {
    PORT: process.env.PORT || 5000,
    MONGO_URL: process.env.MONGO_URL,
    MONGO_DB: process.env.MONGO_DB,
    JWT_SECRET: process.env.JWT_SECRET,
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS
};
