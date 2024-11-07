import passport from "passport";
import passportJWT from "passport-jwt";
import { config } from "./envs.config.js";
import UsersDAO from "../daos/UsersDAO.js";

const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

const buscarToken = (req) => {
    let token = null;

    if (req.cookies.UserCookie) {
        token = req.cookies.UserCookie;
    }

    return token;
};

export const iniciarPassport = () => {
    passport.use(
        "jwt",
        new JwtStrategy(
            {
                secretOrKey: config.JWT_SECRET,
                jwtFromRequest: ExtractJwt.fromExtractors([buscarToken])
            },
            async (payload, done) => {
                try {
                    const user = await UsersDAO.getUserById(payload.user._id);
                    if (!user) {
                        return done(null, false);
                    }
                    return done(null, user);
                } catch (error) {
                    return done(error, false);
                }
            }
        )
    );
};
