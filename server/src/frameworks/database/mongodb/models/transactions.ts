import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  walletId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Wallet",
  },
  amount: {
    type: Number,
  },
  type: {
    type: String,
    enum: ["credit", "debit"],
  },
  description: {
    type: String,
  },
  createdAt: new Date(),
});

//Export the model
export default mongoose.model("User", userSchema);
