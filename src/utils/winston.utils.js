import { createLogger, format, addColors, transports } from "winston";
const { colorize, combine, timestamp, printf, simple } = format;
const { Console, File } = transports;

const levels = { fatal: 0, error: 1, info: 2, http: 3 };
const colors = { fatal: "red", error: "yellow", info: "blue", http: "white" };
addColors(colors);

const customJsonFormat = printf(({ timestamp, level, message }) => {
    return `{"timestamp":"${timestamp}","level":"${level}","message":"${message}"}`;
});

const winstonLogger = createLogger({
    levels,
    format: combine(timestamp({ format: 'YYYY-MM-DD HH:mm:ss' })),
    transports: [
        new Console({
            level: "http",
            format: combine(colorize(), simple(), timestamp(), customJsonFormat),
        }),
        new File({
            level: "error",
            filename: "./src/logs/error.log",
            format: combine(timestamp(), customJsonFormat)
        }),
        new File({
            level: "info",
            filename: "./src/logs/all.log",
            format: combine(timestamp(), customJsonFormat)
        }),
        new File({
            level: "http",
            filename: "./src/logs/http.log",
            format: combine(timestamp(), customJsonFormat)
        })
    ]
});

export default winstonLogger;