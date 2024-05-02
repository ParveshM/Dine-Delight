"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ratingSchema = new mongoose_1.default.Schema({
    restaurantId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Restaurant" },
    userId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
    },
    description: {
        type: String,
        required: true,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Rating", ratingSchema);
