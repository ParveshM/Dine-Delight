"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const restaurantSchema = new mongoose_1.default.Schema({
    restaurantName: {
        type: String,
        required: true,
    },
    slug: {
        type: String,
        index: true,
    },
    email: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["seller"],
        default: "seller",
    },
    address: String,
    description: String,
    tableRatePerPerson: {
        type: Number,
        default: 200,
    },
    location: {
        type: {
            type: String,
            enum: ["Point"],
            default: "Point",
        },
        coordinates: {
            type: [Number],
            default: [0, 0],
        },
    },
    openingTime: String,
    closingTime: String,
    qrCode: String,
    isListed: {
        type: Boolean,
        default: false,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isApproved: {
        type: Boolean,
        default: false,
    },
    isRejected: {
        type: Boolean,
        default: false,
    },
    primaryImage: String,
    secondaryImages: [
        {
            type: String,
        },
    ],
    verificationToken: String,
}, { timestamps: true });
restaurantSchema.index({ location: "2dsphere" }); // indexing for the location
exports.default = mongoose_1.default.model("Restaurant", restaurantSchema);
