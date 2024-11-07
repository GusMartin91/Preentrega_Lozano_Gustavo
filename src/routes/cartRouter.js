import { CustomRouter } from './router.js';
import CartController from '../controllers/CartController.js';
import { body, param } from 'express-validator';
import { passportCall } from '../utils.js';

export class CartRouter extends CustomRouter {
    init() {
        this.post(
            '/',
            ['user', 'admin'],
            passportCall('jwt'),
            CartController.createCart
        );

        this.get(
            '/:cartId',
            ['user', 'admin'],
            passportCall('jwt'),
            param('cartId').isMongoId().withMessage('Invalid cart ID'),
            this.validateRequest,
            CartController.getCartById
        );

        this.post(
            '/:cartId/product/:productId',
            ['user'],
            passportCall('jwt'),
            [
                param('cartId').isMongoId().withMessage('Invalid cart ID'),
                param('productId').isMongoId().withMessage('Invalid product ID'),
                body('quantity').isInt({ min: 1 }).withMessage('Quantity must be a positive integer')
            ],
            this.validateRequest,
            CartController.addProduct
        );

        this.post(
            '/:cartId/purchase',
            ['user', 'admin'],
            passportCall('jwt'),
            param('cartId').isMongoId().withMessage('Invalid cart ID'),
            this.validateRequest,
            CartController.purchaseCart
        );

        this.delete(
            '/:cartId/products/:productId',
            ['user', 'admin'],
            passportCall('jwt'),
            [
                param('cartId').isMongoId().withMessage('Invalid cart ID'),
                param('productId').isMongoId().withMessage('Invalid product ID')
            ],
            this.validateRequest,
            CartController.removeProduct
        );

        this.delete(
            '/:cartId',
            ['user', 'admin'],
            passportCall('jwt'),
            param('cartId').isMongoId().withMessage('Invalid cart ID'),
            this.validateRequest,
            CartController.clearCart
        );

        this.delete(
            '/:cartId/delete',
            ['user', 'admin'],
            passportCall('jwt'),
            param('cartId').isMongoId().withMessage('Invalid cart ID'),
            this.validateRequest,
            CartController.deleteCart
        );
    }
}

export default CartRouter;
