"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const tableSchema = new mongoose_1.default.Schema({
    tableNumber: { type: String, required: true },
    restaurantId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Restaurant" },
    capacity: { type: Number, required: true },
    location: { type: String, required: true, enum: ["In", "Out"] },
});
exports.default = mongoose_1.default.model("Table", tableSchema);
