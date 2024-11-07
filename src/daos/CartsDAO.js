import { sendTicketEmail } from '../nodemailer.js';
import { cartsModel } from './models/cartModel.js';
import { ticketModel } from './models/ticketModel.js';

class CartsDAO {
    async createCart(session = null) {
        try {
            const newCart = await cartsModel.create([{ products: [] }], session ? { session } : {});
            return newCart[0];
        } catch (error) {
            throw new Error(`Error creating cart: ${error.message}`);
        }
    }

    async getCartById(cartId) {
        try {
            const cart = await cartsModel.findById(cartId).populate('products.product');

            return cart || null;
        } catch (error) {
            throw new Error(`Error finding cart: ${error.message}`);
        }
    }

    async updateCart(cartId, updatedProducts, session = null) {
        try {
            const options = { new: true };
            if (session) options.session = session;

            const updatedCart = await cartsModel.findByIdAndUpdate(cartId, { products: updatedProducts }, options);
            if (!updatedCart) {
                throw new Error('Cart not found');
            }
            return updatedCart;
        } catch (error) {
            throw new Error(`Error updating cart: ${error.message}`);
        }
    }

    async createTicket(code, purchase_datetime, purchaser, amount, details, session = null) {
        try {
            const ticketData = {
                code,
                purchase_datetime,
                purchaser,
                amount,
                details
            };
            const createdTicket = await ticketModel.create([ticketData], session ? { session } : {});

            await sendTicketEmail(purchaser, createdTicket[0]);

            return createdTicket[0];
        } catch (error) {
            throw new Error(`Error creating ticket: ${error.message}`);
        }
    }

    async deleteCart(cartId, session = null) {
        try {
            const options = session ? { session } : {};
            const deletedCart = await cartsModel.findByIdAndDelete(cartId, options);

            if (!deletedCart) {
                throw new Error('Cart not found');
            }

            return deletedCart;
        } catch (error) {
            throw new Error(`Error deleting cart: ${error.message}`);
        }
    }
}

export default new CartsDAO();
