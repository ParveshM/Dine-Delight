"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const menuSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: String,
    category: {
        type: String,
        enum: ["starters", "main course", "drinks", "dessert"],
    },
    isVegetarian: {
        type: Boolean,
        required: true,
    },
    tags: Array,
    discount: { type: Number, default: 0 },
    restaurantId: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Restaurant" },
});
exports.default = mongoose_1.default.model("Menu", menuSchema);
