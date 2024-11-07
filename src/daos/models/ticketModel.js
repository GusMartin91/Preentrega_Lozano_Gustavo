import mongoose from "mongoose";

export const ticketModel = mongoose.model(
    "tickets",
    new mongoose.Schema(
        {
            code: {
                type: String,
                unique: true
            },
            purchase_datetime: Date,
            purchaser: String,
            amount: Number,
            details: { type: [] }
        },
        { timestamps: true }
    )
);
