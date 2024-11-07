import rateLimit from 'express-rate-limit';

export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 10,
    message: {
        status: "error",
        message: "Too many requests from this IP, please try again later."
    },
    headers: true,
});
