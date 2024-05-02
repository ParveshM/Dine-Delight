"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const timeSlotScheme = new mongoose_1.default.Schema({
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    restaurantId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Restaurant" },
});
exports.default = mongoose_1.default.model("TimeSlot", timeSlotScheme);
