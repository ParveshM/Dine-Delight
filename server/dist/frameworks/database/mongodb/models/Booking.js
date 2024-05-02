"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bookingSchema = new mongoose_1.default.Schema({
    bookingId: {
        type: "string",
        default: function () {
            return `DINE-${new Date().getTime().toString()}-${Math.floor(Math.random() * 10000)
                .toString()
                .padStart(4, "0")}`;
        },
        required: true,
        unique: true,
    },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    restaurantId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Restaurant" },
    tableId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Table" },
    tableSlotId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "TableSlot" },
    paymentMethod: {
        type: String,
        required: true,
        enum: ["Online", "Wallet"],
    },
    paymentStatus: {
        type: String,
        enum: ["Pending", "Paid", "Failed", "Refunded"],
        default: "Pending",
    },
    bookingStatus: {
        type: String,
        enum: [
            "Pending",
            "Confirmed",
            "Cancelled",
            "Checked-in",
            "No-show",
            "Completed",
        ],
        default: "Pending",
    },
    gstAmount: {
        type: Number,
        required: true,
    },
    totalAmount: {
        type: Number,
        required: true,
    },
    foodStatus: {
        type: String,
        enum: ["Accepted", "Preparing", "Ready", "Served", "Delayed"],
    },
    adminPayment: Number,
}, { timestamps: true });
exports.default = mongoose_1.default.model("Booking", bookingSchema);
