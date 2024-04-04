import mongoose from "mongoose";
const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    conversationId: { type: String },
    senderId: { type: String },
    text: { type: String },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Message", messageSchema);
