import { Router } from "express";
import { misRespuestas } from "../middlewares/respuestas.middleware.js";
import { auth } from "../middlewares/auth.middleware.js";
import { processCallbacks } from "../middlewares/processCallbacks.middleware.js";
import { validationResult } from 'express-validator';

export class CustomRouter {
    #router;

    constructor() {
        this.#router = Router();
        this.init();
    }

    init() {
    }

    getRouter() {
        return this.#router;
    }

    get(ruta, permisos, ...funciones) {
        this.#router.get(ruta, misRespuestas, auth(permisos), processCallbacks(funciones));
    }

    post(ruta, permisos, ...funciones) {
        this.#router.post(ruta, misRespuestas, auth(permisos), processCallbacks(funciones));
    }

    put(ruta, permisos, ...funciones) {
        this.#router.put(ruta, misRespuestas, auth(permisos), processCallbacks(funciones));
    }

    delete(ruta, permisos, ...funciones) {
        this.#router.delete(ruta, misRespuestas, auth(permisos), processCallbacks(funciones));
    }

    validateRequest(req, res, next) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
}
