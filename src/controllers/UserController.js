import { validationResult } from 'express-validator';
import UserService from '../services/UserService.js';
import UserDTO from '../dtos/UserDTO.js';

class UserController {
    static async login(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.badrequest(errors.array());
        }

        const { email, password } = req.body;
        try {
            const { message, accessToken, refreshToken, user } = await UserService.login(email, password);
            res.cookie('UserCookie', accessToken, { httpOnly: true });
            res.cookie('RefreshToken', refreshToken, { httpOnly: true });
            return res.success({ message, user, accessToken });
        } catch (error) {
            return res.internalerror(error.message);
        }
    }

    static async refreshToken(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.badrequest(errors.array());
        }

        const refreshToken = req.cookies.RefreshToken;
        try {
            const { message, accessToken } = await UserService.refreshToken(refreshToken);
            res.cookie('UserCookie', accessToken, { httpOnly: true });
            return res.success({ message });
        } catch (error) {
            return res.unauthorized(error.message);
        }
    }

    static async register(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.badrequest(errors.array());
        }

        const { first_name, last_name, email, password, age, role } = req.body;
        try {
            const result = await UserService.register(first_name, last_name, email, password, age, role);
            return res.created(result);
        } catch (error) {
            return res.internalerror(error.message);
        }
    }

    static async update(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.badrequest(errors.array());
        }

        const { first_name, last_name, email, password, age } = req.body;
        const userId = req.user._id;

        try {
            const result = await UserService.update(userId, first_name, last_name, email, password, age);
            return res.success(result);
        } catch (error) {
            return res.internalerror(error.message);
        }
    }

    static logout(req, res) {
        res.clearCookie('UserCookie');
        res.clearCookie('RefreshToken');
        return res.success('Logged out successfully');
    }

    static getCurrentUser(req, res) {
        const userDTO = new UserDTO(req.user);
        return res.success(userDTO);
    }
    static async deleteUser(req, res) {
        try {
            const userId = req.params.id;

            // Llamar al servicio para eliminar al usuario
            const result = await UserService.deleteUser(userId);

            return res.success(result);
        } catch (error) {
            return res.internalerror(error.message);
        }
    }
}

export default UserController;