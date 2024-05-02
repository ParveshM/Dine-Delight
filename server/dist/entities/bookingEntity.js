"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function bookingEntity(userId, restaurantId, tableId, tableSlotId, paymentMethod, gstAmount, totalAmount) {
    return {
        getUserId: () => userId,
        getRestaurantId: () => restaurantId,
        getTableId: () => tableId,
        getTableSlotId: () => tableSlotId,
        getPaymentMethod: () => paymentMethod,
        getGstAmount: () => gstAmount,
        getTotalAmount: () => totalAmount,
    };
}
exports.default = bookingEntity;
