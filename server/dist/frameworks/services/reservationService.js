"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reservationService = void 0;
const reservationService = () => {
    const calculateGSTAmount = (subTotal) => {
        const gstRate = 18;
        const gstAmount = (gstRate / 100) * subTotal;
        const totalAmount = subTotal + gstAmount;
        return { gstAmount, totalAmount };
    };
    return { calculateGSTAmount };
};
exports.reservationService = reservationService;
