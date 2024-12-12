import { body } from 'express-validator';
import { CustomRouter } from './router.js';
import ProductController from '../controllers/ProductController.js';
import { passportCall } from '../../utils.js';

export class ProductRouter extends CustomRouter {
    init() {
        this.post('/', ['admin'], passportCall('jwt'), [
            body('title').notEmpty().withMessage('Title is required'),
            body('code').notEmpty().withMessage('Code is required'),
            body('price').isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
            body('stock').isInt({ gt: 0 }).withMessage('Stock must be an integer greater than 0')
        ], ProductController.createProduct);

        this.put('/update/:id', ['admin'], passportCall('jwt'), [
            body('title').optional().notEmpty().withMessage('Title cannot be empty'),
            body('price').optional().isFloat({ gt: 0 }).withMessage('Price must be a positive number'),
            body('stock').optional().isInt({ gt: 0 }).withMessage('Stock must be an integer greater than 0')
        ], ProductController.updateProduct);

        this.delete('/delete/:id', ['admin'], passportCall('jwt'), ProductController.deleteProduct);

        this.get('/', ['public'], ProductController.getAllProducts);
        this.get('/:id', ['public'], ProductController.getProductById);
    }
}

export default ProductRouter;
