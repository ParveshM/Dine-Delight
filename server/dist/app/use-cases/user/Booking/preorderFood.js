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
exports.deletePreOrderForBooking = exports.createPreOrderForBooking = void 0;
const httpStatus_1 = require("../../../../types/httpStatus");
const customError_1 = __importDefault(require("../../../../utils/customError"));
const createPreOrderForBooking = (bookingID, cartItems, bookingRepository) => __awaiter(void 0, void 0, void 0, function* () {
    if (!bookingID)
        throw new customError_1.default("Please provide a booking ID", httpStatus_1.HttpStatus.BAD_REQUEST);
    const booking = bookingRepository.getBookingById(bookingID);
    if (!booking)
        throw new customError_1.default("Please provide a booking ID", httpStatus_1.HttpStatus.BAD_REQUEST);
    for (const item of cartItems) {
        const isItemExists = yield bookingRepository.getOrderItem({
            bookingId: bookingID,
            itemId: item._id,
        });
        if (isItemExists) {
            const updateData = {
                $set: { quantity: item.quantity },
            };
            yield bookingRepository.updatePreOrderItem({
                bookingId: bookingID,
                itemId: item._id,
            }, updateData);
        }
        else {
            yield bookingRepository.createPreOrder(bookingID, item);
        }
    }
    yield bookingRepository.updateBookingDetails(bookingID, {
        foodStatus: "Accepted",
    });
});
exports.createPreOrderForBooking = createPreOrderForBooking;
const deletePreOrderForBooking = (bookingID, cartItemId, bookingRepository) => __awaiter(void 0, void 0, void 0, function* () {
    if (!bookingID)
        throw new customError_1.default("Please provide a booking ID", httpStatus_1.HttpStatus.BAD_REQUEST);
    const booking = bookingRepository.getBookingById(bookingID);
    if (!booking)
        throw new customError_1.default("Please provide a booking ID", httpStatus_1.HttpStatus.BAD_REQUEST);
    yield bookingRepository.deleteOrderItem({
        bookingId: bookingID,
        itemId: cartItemId,
    });
});
exports.deletePreOrderForBooking = deletePreOrderForBooking;
