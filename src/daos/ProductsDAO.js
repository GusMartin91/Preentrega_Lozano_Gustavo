import { productModel } from './models/productModel.js';

class ProductsDAO {
    async createProduct(productData) {
        try {
            const newProduct = await productModel.create(productData);
            return newProduct;
        } catch (error) {
            throw new Error(`Error creating product: ${error.message}`);
        }
    }

    async insertMany(products) {
        try {
            return await productModel.insertMany(products);
        } catch (error) {
            throw new Error(`Error inserting products: ${error.message}`);
        }
    }

    async updateProductById(productId, updateData, session = null) {
        try {
            let updatedProduct = null
            if (session) {
                updatedProduct = await productModel.findByIdAndUpdate(productId, updateData, { new: true }).session(session);
            } else {
                updatedProduct = await productModel.findByIdAndUpdate(productId, updateData, { new: true });
            }
            if (!updatedProduct) {
                throw new Error('Product not found');
            }
            return updatedProduct;
        } catch (error) {
            throw new Error(`Error updating product: ${error.message}`);
        }
    }

    async deleteProductById(productId) {
        try {
            const deletedProduct = await productModel.findByIdAndDelete(productId);
            if (!deletedProduct) {
                throw new Error('Product not found');
            }
            return { message: "Product successfully deleted", product: deletedProduct };
        } catch (error) {
            throw new Error(`Error deleting product: ${error.message}`);
        }
    }

    async getAllProducts() {
        try {
            const products = await productModel.find().lean();
            return products;
        } catch (error) {
            throw new Error(`Error fetching products: ${error.message}`);
        }
    }

    async getProductById(productId) {
        try {
            const product = await productModel.findById(productId);
            if (!product) {
                throw new Error('Product not found');
            }
            return product;
        } catch (error) {
            throw new Error(`Error finding product by ID: ${error.message}`);
        }
    }
}

export default new ProductsDAO();
