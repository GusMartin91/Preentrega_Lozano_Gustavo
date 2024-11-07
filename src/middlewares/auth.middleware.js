import jwt from "jsonwebtoken";
import { config } from "../config/envs.config.js";

export const auth = (permisos = []) => {
    return (req, res, next) => {
        if (!Array.isArray(permisos)) {
            return res.internalerror("Error in route permissions");
        }

        permisos = permisos.map(p => p.toLowerCase());
        if (permisos.includes("public")) {
            return next();
        }

        if (!req.cookies.UserCookie) {
            return res.unauthorized("No authenticated users");
        }

        let token = req.cookies.UserCookie;
        let usuario;

        try {
            usuario = jwt.verify(token, config.JWT_SECRET);
        } catch (error) {
            return res.unauthorized(error.message);
        }

        if (!permisos.includes(usuario.user.role.toLowerCase())) {
            return res.forbidden("You do not have sufficient privileges to access the requested resource");
        }

        return next();
    };
};
