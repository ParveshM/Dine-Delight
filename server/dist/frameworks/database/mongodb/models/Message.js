"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const messageSchema = new Schema({
    conversationId: { type: String },
    senderId: { type: String },
    text: { type: String },
    isRead: { type: Boolean, default: false },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Message", messageSchema);
