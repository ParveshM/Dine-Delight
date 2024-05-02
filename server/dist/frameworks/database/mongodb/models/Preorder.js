"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const preorderSchema = new mongoose_1.default.Schema({
    bookingId: {
        type: String,
        required: true,
    },
    itemId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Menu",
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
exports.default = mongoose_1.default.model("Preorder", preorderSchema);
