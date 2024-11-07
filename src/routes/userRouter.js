import { body } from 'express-validator';
import { CustomRouter } from './router.js';
import { limiter } from '../middlewares/rateLimiter.middleware.js';
import UserController from '../controllers/UserController.js';
import { passportCall } from '../utils.js';

export class UserRouter extends CustomRouter {
    init() {
        this.post('/login', ['public'], limiter, [
            body('email').isEmail().withMessage('Invalid email format').notEmpty().withMessage('Email is required'),
            body('password').notEmpty().withMessage('Password is required')
        ], UserController.login);

        this.post('/refresh-token', ['public'], [
            body('refreshToken').notEmpty().withMessage('Refresh token is required')
        ], UserController.refreshToken);

        this.post('/register', ['public'], limiter, [
            body('first_name').notEmpty().withMessage('First name is required'),
            body('last_name').notEmpty().withMessage('Last name is required'),
            body('email').isEmail().withMessage('Invalid email format').notEmpty().withMessage('Email is required'),
            body('password').isLength({ min: 3 }).withMessage('Password must be at least 6 characters long').notEmpty().withMessage('Password is required'),
            body('age').optional().isInt({ min: 1 }).withMessage('Age must be a positive integer'),
            body('cart').optional().isMongoId().withMessage('Cart must be a valid MongoID')
        ], UserController.register);

        this.put('/update', ['user', 'admin'], passportCall('jwt'), [
            body('first_name').optional().notEmpty().withMessage('First name cannot be empty'),
            body('last_name').optional().notEmpty().withMessage('Last name cannot be empty'),
            body('email').optional().isEmail().withMessage('Invalid email format'),
            body('password').optional().isLength({ min: 3 }).withMessage('Password must be at least 6 characters long'),
            body('age').optional().isInt({ min: 1 }).withMessage('Age must be a positive integer'),
            body('cart').optional().isMongoId().withMessage('Cart must be a valid MongoID')
        ], UserController.update);

        this.get('/logout', ['user', 'admin'], passportCall('jwt'), UserController.logout);

        this.get('/current', ['user', 'admin'], passportCall('jwt'), UserController.getCurrentUser);
    }
}

export default UserRouter;
