import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  role: {
    type: String,
    enum: ["user"],
    default: "user",
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  wallet: { type: mongoose.Schema.Types.ObjectId, ref: "Wallet" },
  bookmarks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Restaurant",
    },
  ],
  createdAt: {
    type: Date,
    default: new Date(),
  },
  verificationCode: String,
});

export default mongoose.model("User", userSchema);
