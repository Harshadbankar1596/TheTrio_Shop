import mongoose from "mongoose";

const cuponSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: true,
            unique: true,
        },
        discount: {
            type: Number,
            required: true,
            min: 0,
        },
        expirationDate: {
            type: Date,
            required: true,
        },
        usageLimit: {
            type: Number,
            required: true,
            min: 1,
        },
    }, { timestamps: true })

export default mongoose.model("Cupon", cuponSchema);