"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reservationServiceInterface = void 0;
const reservationServiceInterface = (service) => {
    const calculateGSTAmount = (subtotal) => service.calculateGSTAmount(subtotal);
    return {
        calculateGSTAmount,
    };
};
exports.reservationServiceInterface = reservationServiceInterface;
