import mongoose from "mongoose";

const tableSchema = new mongoose.Schema({
  tableNumber: { type: String, required: true },
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
  capacity: { type: Number, required: true },
  location: { type: String, required: true, enum: ["In", "Out"] },
});

export default mongoose.model("Table", tableSchema);
