import mongoose from "mongoose";

const reserveTableSlotSchema = new mongoose.Schema({
  tableId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Table",
  },
  slot: {
    type: Date,
    required: true,
  },
  isAvailable: {
    type: Boolean,
    default: true,
  },
});

export default mongoose.model("ReserveTableSlot", reserveTableSlotSchema);
