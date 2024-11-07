import mongoose from 'mongoose';
import CartService from '../services/CartService.js';
import ProductService from '../services/ProductService.js';

class CartController {
    static async createCart(req, res) {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const cart = await CartService.createCart(session);
            await session.commitTransaction();
            session.endSession();
            return res.success({ message: 'Cart created successfully', cart });
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            return res.internalerror(error.message);
        }
    }

    static async getCartById(req, res) {
        try {
            const cartId = req.params.cartId;
            const cart = await CartService.getCartById(cartId);
            if (!cart) {
                return res.notfound("Cart not found");
            }
            return res.success(cart);
        } catch (error) {
            return res.internalerror(error.message);
        }
    }

    static async addProduct(req, res) {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const { cartId, productId } = req.params;
            const { quantity } = req.body;
            const updatedCart = await CartService.addProductToCart(cartId, productId, quantity, session);
            await session.commitTransaction();
            session.endSession();
            return res.success(updatedCart);
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            return res.internalerror(error.message);
        }
    }

    static async removeProduct(req, res) {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const { cartId, productId } = req.params;
            const updatedCart = await CartService.removeProductFromCart(cartId, productId, session);
            await session.commitTransaction();
            session.endSession();
            return res.success(updatedCart);
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            return res.internalerror(error.message);
        }
    }

    static async clearCart(req, res) {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const { cartId } = req.params;
            const updatedCart = await CartService.clearCart(cartId, session);
            await session.commitTransaction();
            session.endSession();
            return res.success(updatedCart);
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            return res.internalerror(error.message);
        }
    }

    static async deleteCart(req, res) {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const { cartId } = req.params;
            await CartService.deleteCart(cartId, session);
            await session.commitTransaction();
            session.endSession();
            return res.success({ message: 'Cart deleted successfully' });
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            return res.internalerror(error.message);
        }
    }

    static async purchaseCart(req, res) {
        const session = await mongoose.startSession();
        session.startTransaction();
        try {
            const cartId = req.params.cartId;
            const cart = await CartService.getCartById(cartId)
            if (!cart) {
                await session.abortTransaction();
                return res.notfound("Cart not found");
            }

            for (let i = 0; i < cart.products.length; i++) {
                let p = cart.products[i];
                let product = await ProductService.getProductById(p.product._id);
                if (product && product.stock >= p.quantity) {
                    p.inStock = true
                    product.stock = product.stock - p.quantity
                    await ProductService.updateProduct(p.product._id, product, session);
                }
            }

            const availableProducts = cart.products.filter(p => p.inStock == true)
            cart.products = cart.products.filter(p => p.inStock == undefined)

            if (availableProducts.length === 0) {
                await session.abortTransaction();
                return res.badrequest("No items available for purchase.")
            }

            let amount = availableProducts.reduce((acum, item) => acum += item.quantity * item.product.price, 0)
            let code = Date.now()
            let purchase_datetime = new Date()
            let purchaser = req.user.email
            let details = availableProducts
            const ticket = await CartService.createTicket(
                code, purchase_datetime, purchaser, amount, details, session);

            await CartService.updateCart(cartId, cart, session);

            await session.commitTransaction();
            session.endSession();

            return res.success(ticket);
        } catch (error) {
            await session.abortTransaction();
            session.endSession();
            return res.internalerror(error.message);
        }
    }
}

export default CartController;
