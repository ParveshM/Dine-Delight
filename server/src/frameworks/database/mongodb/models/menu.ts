import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    enum: ["starters", "main course", "drinks", "dessert"],
  },
  isVegetarian: {
    type: Boolean,
    required: true,
  },
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
});
export default mongoose.model("Menu", menuSchema);
