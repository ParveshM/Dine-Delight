import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    chatName: {
      type: String,
      required: true,
      default: "user",
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
    latestMessage: { type: mongoose.Schema.Types.ObjectId, ref: "Message" },
  },
  { timestamps: true }
);

export default mongoose.model("Chat", chatSchema);
