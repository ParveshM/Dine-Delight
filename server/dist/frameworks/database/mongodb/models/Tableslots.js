"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TableSlotSchema = new mongoose_1.default.Schema({
    tableId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
exports.default = mongoose_1.default.model("TableSlot", TableSlotSchema);
