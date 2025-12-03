import mongoose from "mongoose";

const subCategory = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true, trim: true },
        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },
        image: {
            type: String,
        }
    }
);

export default mongoose.model("SubCategory", subCategory);