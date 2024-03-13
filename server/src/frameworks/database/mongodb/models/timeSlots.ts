import mongoose from "mongoose";

const timeSlotScheme = new mongoose.Schema({
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
});

export default mongoose.model("TimeSlot", timeSlotScheme);
