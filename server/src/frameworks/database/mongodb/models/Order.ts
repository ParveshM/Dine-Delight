import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: "string",
      default: function () {
        return `ORD-${new Date().getTime().toString()}-${Math.floor(
          Math.random() * 10000
        )
          .toString()
          .padStart(4, "0")}`;
      },
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
    tableNumber: String,
    mobile: String,
    orderItems: [
      {
        item: { type: mongoose.Schema.Types.ObjectId, ref: "Menu" },
        price: Number,
        quantity: Number,
      },
    ],
    total: Number,
    status: {
      type: String,
      enum: ["Pending", "Completed", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
