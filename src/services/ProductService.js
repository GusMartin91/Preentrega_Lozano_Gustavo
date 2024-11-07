import ProductsDAO from '../daos/ProductsDAO.js';

class ProductService {
    static async createProduct(productData) {
        return await ProductsDAO.createProduct(productData);
    }

    static async updateProduct(productId, updateData, session = null) {
        return await ProductsDAO.updateProductById(productId, updateData, session);
    }

    static async deleteProduct(productId) {
        return await ProductsDAO.deleteProductById(productId);
    }

    static async getAllProducts() {
        return await ProductsDAO.getAllProducts();
    }

    static async getProductById(productId) {
        return await ProductsDAO.getProductById(productId);
    }
    static async createMultipleProducts(products) {
        return await ProductsDAO.insertMany(products);
    }
}

export default ProductService;
