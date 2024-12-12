import { validationResult } from 'express-validator';
import ProductService from '../services/ProductService.js';

class ProductController {
    static async createProduct(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.badrequest(errors.array());
        }

        const { title, code, price, stock } = req.body;
        try {
            const product = await ProductService.createProduct({ title, code, price, stock });
            return res.created({ message: 'Product created successfully', product });
        } catch (error) {
            return res.internalerror(error.message);
        }
    }

    static async updateProduct(req, res) {
        const { id } = req.params;
        const { title, code, price, stock } = req.body;
        try {
            const product = await ProductService.updateProduct(id, { title, code, price, stock });
            return res.success({ message: 'Product updated successfully', product });
        } catch (error) {
            return res.internalerror(error.message);
        }
    }

    static async deleteProduct(req, res) {
        const { id } = req.params;
        try {
            const result = await ProductService.deleteProduct(id);
            return res.success(result);
        } catch (error) {
            return res.internalerror(error.message);
        }
    }

    static async getAllProducts(req, res) {
        try {
            const products = await ProductService.getAllProducts();
            return res.success({ products });
        } catch (error) {
            return res.internalerror(error.message);
        }
    }

    static async getProductById(req, res) {
        const { id } = req.params;
        try {
            const product = await ProductService.getProductById(id);
            return res.success({ product });
        } catch (error) {
            return res.internalerror(error.message);
        }
    }
}

export default ProductController;
