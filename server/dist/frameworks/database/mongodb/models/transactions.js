"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const transactionSchema = new mongoose_1.default.Schema({
    walletId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Wallet",
    },
    amount: {
        type: Number,
    },
    type: {
        type: String,
        enum: ["Credit", "Debit"],
    },
    description: {
        type: String,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Transaction", transactionSchema);
