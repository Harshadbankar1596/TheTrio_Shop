import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        description: {
            type: String,
            required: true,
        },

        category: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
            required: true,
        },

        subCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "SubCategory",
            required: true,
        },

        price: {
            type: Number,
            required: true,
        },

        discount: {
            type: Number,
            default: 0,
        },

        finalPrice: {
            type: Number,
            required: true,
        },

        sizes: [
            {
                type: String,
                enum: ["S", "M", "L", "XL", "XXL"],
            },
        ],

        colors:
        {
            type: String,
        },


        images: [
            {
                type: String,
                required: true,
            },
        ],

        stock: {
            type: Number,
            default: 0,
        },

        rating: {
            type: Number,
            default: 0,
        },

        isActive: {
            type: Boolean,
            default: true,
        },
    },
    { timestamps: true }
);

productSchema.index({
    title: "text",
    category: 1,
    subCategory: 1,
});

productSchema.pre("save", function () {
    this.finalPrice = Math.floor(this.price - (this.price * this.discount) / 100);
});


export default mongoose.model("Product", productSchema);