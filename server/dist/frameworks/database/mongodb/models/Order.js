"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchema = new mongoose_1.default.Schema({
    orderId: {
        type: "string",
        default: function () {
            return `ORD-${new Date().getTime().toString()}-${Math.floor(Math.random() * 10000)
                .toString()
                .padStart(4, "0")}`;
        },
        required: true,
    },
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    restaurant: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Restaurant" },
    tableNumber: String,
    mobile: String,
    orderItems: [
        {
            item: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Menu" },
            price: Number,
            quantity: Number,
        },
    ],
    total: Number,
    status: {
        type: String,
        enum: ["Pending", "Confirmed", "InProgress", "Completed", "Cancelled"],
        default: "Pending",
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Order", orderSchema);
