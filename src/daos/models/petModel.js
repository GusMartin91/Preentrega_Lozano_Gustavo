import mongoose from "mongoose";

const petSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        type: { type: String, required: true },
        age: { type: Number, required: true },
        adopted: { type: Boolean, default: false },
        owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
    },
    {
        timestamps: true,
        strict: false
    }
);

const petModel = mongoose.model("Pet", petSchema);

export default petModel;
