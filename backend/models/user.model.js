import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone : { type: String, unique: true },
  email: { type: String, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });

userSchema.index({ email: 1 });

export default mongoose.model("User", userSchema);