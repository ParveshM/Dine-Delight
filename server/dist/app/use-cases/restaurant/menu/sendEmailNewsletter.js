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
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmailNewsLetter = void 0;
const mailService_1 = require("../../../../frameworks/services/mailService");
const sendEmailNewsLetter = (restaurantId, userRepository, bookingRepository, data) => __awaiter(void 0, void 0, void 0, function* () {
    let senderList = [];
    const bookings = yield bookingRepository.bookings({
        restaurantId,
    });
    const uniqueEmail = new Map();
    if (bookings) {
        for (const booking of bookings) {
            const isSubscribed = yield userRepository.isUserSubscribed(booking.userId._id, restaurantId);
            if (!isSubscribed && !uniqueEmail.has(booking.userId.email)) {
                uniqueEmail.set(booking.userId.email, true);
                senderList.push({
                    userName: booking.userId.name,
                    email: booking.userId.email,
                    restaurantId,
                    restaurantName: booking.restaurantId.restaurantName,
                    userId: booking.userId._id,
                });
            }
        }
        senderList.length && (0, mailService_1.startEmailSendingJob)(senderList, data);
    }
});
exports.sendEmailNewsLetter = sendEmailNewsLetter;
