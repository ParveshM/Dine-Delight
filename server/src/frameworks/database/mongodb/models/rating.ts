import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5,
  },
  description: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Rating", ratingSchema);
