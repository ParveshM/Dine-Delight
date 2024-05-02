"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelBookingAndUpdateWallet = void 0;
const httpStatus_1 = require("../../../../types/httpStatus");
const customError_1 = __importDefault(require("../../../../utils/customError"));
const updateWallet_1 = require("./updateWallet");
const cancelBookingAndUpdateWallet = (userID, bookingID, bookingRepository, userRepository) => __awaiter(void 0, void 0, void 0, function* () {
    if (!bookingID)
        throw new customError_1.default("Please provide a booking ID", httpStatus_1.HttpStatus.BAD_REQUEST);
    const bookingDetails = yield bookingRepository.updateBookingDetails(bookingID, {
        bookingStatus: "Cancelled",
        paymentStatus: "Refunded",
    });
    const booking = (yield bookingRepository.getBookingById(bookingID));
    if (bookingDetails) {
        const data = {
            newBalance: bookingDetails === null || bookingDetails === void 0 ? void 0 : bookingDetails.totalAmount,
            type: "Credit",
            description: "Booking cancellation refund amount",
        };
        const updateWalletDetails = yield (0, updateWallet_1.updateWallet)(userID, data, userRepository);
    }
    return bookingDetails;
});
exports.cancelBookingAndUpdateWallet = cancelBookingAndUpdateWallet;
