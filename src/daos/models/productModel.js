import mongoose from "mongoose";

export const productModel = mongoose.model(
    "products",
    new mongoose.Schema(
        {
            title: { type: String, required: true },
            code: { type: String, required: true, unique: true },
            price: { type: Number, required: true },
            stock: { type: Number, required: true },
            thumbnail: { type: Array, default: [] },
            status: { type: Boolean, default: true, },
            category: { type: String },
            description: { type: String, },
        },
        {
            timestamps: true, strict: false
        }
    )
)