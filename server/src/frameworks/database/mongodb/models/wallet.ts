import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
  balance: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("Wallet", userSchema);
