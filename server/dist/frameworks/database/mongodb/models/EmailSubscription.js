"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const emailSubscription = new mongoose_1.default.Schema({
    restaurant: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Restaurant" },
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "User" },
    isSubscribed: { type: Boolean },
});
exports.default = mongoose_1.default.model("EmailSubscription", emailSubscription);
