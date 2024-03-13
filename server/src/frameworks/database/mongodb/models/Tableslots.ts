import mongoose from "mongoose";

const TableSlotSchema = new mongoose.Schema({
  tableId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Table",
  },
  slotDate: {
    type: Date,
    required: true,
  },
  startTime: String,
  endTime: String,
  isAvailable: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("TableSlot", TableSlotSchema);
