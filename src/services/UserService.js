import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UsersDAO from '../daos/UsersDAO.js';
import { config } from '../config/envs.config.js';
import CartService from './CartService.js';

class UserService {
    static async login(email, password) {
        const user = await UsersDAO.getUserByEmail(email);
        if (!user || !bcrypt.compareSync(password, user.password)) {
            throw new Error('Invalid email or password');
        }

        const accessToken = jwt.sign({ user }, config.JWT_SECRET, { expiresIn: '1h' });
        const refreshToken = jwt.sign({ user }, config.JWT_REFRESH_SECRET, { expiresIn: '7d' });

        return { message: 'Login successful', accessToken, refreshToken, user };
    }

    static async refreshToken(refreshToken) {
        try {
            const user = jwt.verify(refreshToken, config.JWT_REFRESH_SECRET);
            const newAccessToken = jwt.sign({ user }, config.JWT_SECRET, { expiresIn: '1h' });
            return { message: 'Token refreshed successfully', accessToken: newAccessToken };
        } catch (error) {
            throw new Error('Invalid refresh token');
        }
    }

    static async register(first_name, last_name, email, password, age) {
        const existingUser = await UsersDAO.getUserByEmail(email);
        if (existingUser) {
            throw new Error('Email already in use');
        }

        const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

        const newCart = await CartService.createCart();
        const newUser = {
            first_name,
            last_name,
            email,
            password: hashedPassword,
            age,
            cart: newCart._id
        };

        const createdUser = await UsersDAO.createUser(newUser);
        return { message: 'User registered successfully', user: createdUser };
    }

    static async update(userId, first_name, last_name, email, password, age) {
        const updateData = {};
        if (first_name) updateData.first_name = first_name;
        if (last_name) updateData.last_name = last_name;
        if (email) updateData.email = email;
        if (password) updateData.password = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
        if (age) updateData.age = age;

        const updatedUser = await UsersDAO.updateUserById(userId, updateData);
        return { message: 'User updated successfully', user: updatedUser };
    }

    static logout() {
        return true;
    }

    static async createMultipleUsers(users) {
        const usersWithHashedPasswords = users.map(user => {
            const hashedPassword = bcrypt.hashSync("coder123", bcrypt.genSaltSync(10));
            return {
                ...user,
                password: hashedPassword,
                role: Math.random() > 0.5 ? 'admin' : 'user',
            };
        });

        return await UsersDAO.insertMany(usersWithHashedPasswords);
    }
}

export default UserService;