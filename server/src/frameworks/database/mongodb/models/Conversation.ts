import mongoose from "mongoose";

const conversationShema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Chat", conversationShema);
