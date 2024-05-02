"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
    },
    profilePicture: {
        type: String,
    },
    role: {
        type: String,
        enum: ["user"],
        default: "user",
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isBlocked: {
        type: Boolean,
        default: false,
    },
    wallet: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "Wallet" },
    bookmarks: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Restaurant",
        },
    ],
    createdAt: {
        type: Date,
        default: new Date(),
    },
    verificationCode: String,
});
exports.default = mongoose_1.default.model("User", userSchema);
