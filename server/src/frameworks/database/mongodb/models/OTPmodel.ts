import mongoose from "mongoose";

const OTPModel = new mongoose.Schema(
  {
    OTP: {
      type: String,
    },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);
OTPModel.index({ createdAt: 1 }, { expireAfterSeconds: 120 });

export default mongoose.model("OTP", OTPModel);
