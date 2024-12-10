import express from "express";
import cookieParser from "cookie-parser"
import __dirname from "./utils.js";
import { MongoDB } from "./config/mongoDB.config.js";
import { config } from "./config/envs.config.js";
import passport from 'passport';
import { iniciarPassport } from './config/passport.config.js';
import indexRouter from "./routes/index.router.js";
import winstonLogger from './utils/winston.utils.js';

const app = express();

app.use(cookieParser())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"))
app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        winstonLogger.http(`HTTP Request - ${req.method} ${req.originalUrl} - ` +
            `IP: ${req.ip} - ` +
            `User-Agent: ${req.get('User-Agent')} - ` +
            `Body: ${JSON.stringify(req.body)} - ` +
            `Duration: ${duration}ms - ` +
            `Status: ${res.statusCode}`);
    });
    next();
});

iniciarPassport()

app.use(passport.initialize())
app.use("/api", indexRouter);

const httpServer = app.listen(config.PORT, () => {
    winstonLogger.info(`Server listening on port: ${config.PORT}`);
});

app.use((err, req, res, next) => {
    winstonLogger.error(`Error - ${err.message} - ` +
        `Method: ${req.method} - ` +
        `URL: ${req.originalUrl} - ` +
        `IP: ${req.ip} - ` +
        `Body: ${JSON.stringify(req.body)} - ` +
        `Stack: ${err.stack}`);

    res.status(500).json({ message: 'Internal server error', error: err.message });
});

await MongoDB.connect(config.MONGO_URL, config.MONGO_DB);