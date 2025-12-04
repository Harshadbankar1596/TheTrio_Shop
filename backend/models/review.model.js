import mongoose, { Mongoose } from "mongoose";

const ReviewSchema = new mongoose.Schema({
  User: {
    type: String,
    required: true,
    ref: "User",
  },

  Product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
    required: true,
  },

  Rating: {
    type: Number,
    required: true,
  },

  Description: {
    type: String,
  },
});
ReviewSchema.index({ User: 1, Product: 1 });
ReviewSchema.index({ Product: 1 });

export default mongoose.model("Review", ReviewSchema);
