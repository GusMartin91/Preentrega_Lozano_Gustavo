import mongoose from "mongoose";
import CartsDAO from '../daos/CartsDAO.js';

class CartService {
    async createCart(session = null) {
        return await CartsDAO.createCart(session);
    }

    async getCartById(cartId) {
        if (!mongoose.Types.ObjectId.isValid(cartId)) {
            return null;
        }

        const cart = await CartsDAO.getCartById(cartId);

        return cart || null;
    }

    async addProductToCart(cartId, productId, quantity, session = null) {
        const cart = await CartsDAO.getCartById(cartId);

        if (!cart) return null;

        const productIndex = cart.products.findIndex(p => p.product._id.toString() === productId);

        if (productIndex >= 0) {
            cart.products[productIndex].quantity += quantity;
        } else {
            cart.products.push({ product: productId, quantity });
        }

        if (cart.products.length > 0) {
            if (!session) {
                return await CartsDAO.updateCart(cartId, cart.products);
            }
            return await CartsDAO.updateCart(cartId, cart.products, session);
        }
        return null;
    }

    async updateCart(cartId, cart, session = null) {
        if (!session) {
            return await CartsDAO.updateCart(cartId, cart.products);
        }
        return await CartsDAO.updateCart(cartId, cart.products, session);
    }

    async removeProductFromCart(cartId, productId, session = null) {
        const cart = await CartsDAO.getCartById(cartId);
        if (!cart) return null;
        cart.products = cart.products.filter(p => p.product._id.toString() !== productId);

        if (!session) {
            return await CartsDAO.updateCart(cartId, cart.products);
        }
        return await CartsDAO.updateCart(cartId, cart.products, session);
    }

    async clearCart(cartId, session = null) {
        if (!session) {
            return await CartsDAO.updateCart(cartId, [], session);
        }
        return await CartsDAO.updateCart(cartId, [], session);
    }
    async createTicket(code, purchase_datetime, purchaser, amount, details, session = null) {
        if (!session) {
            return await CartsDAO.createTicket(code, purchase_datetime, purchaser, amount, details);
        }
        return await CartsDAO.createTicket(code, purchase_datetime, purchaser, amount, details, session);
    }

    async deleteCart(cartId, session = null) {
        if (!session) {
            return await CartsDAO.deleteCart(cartId);
        }
        return await CartsDAO.deleteCart(cartId, session);
    }
}

export default new CartService();
