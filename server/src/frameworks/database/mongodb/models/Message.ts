import mongoose from "mongoose";
const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    sender: { type: String, required: true },
    content: {
      type: String,
      trim: true,
    },
    chat: { type: Schema.Types.ObjectId, ref: "Chat" },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);

export default mongoose.model("Message", messageSchema);
