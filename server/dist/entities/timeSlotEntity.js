"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function TimeSlotEntity(restaurantId, startTime, endTime) {
    return {
        getRestaurantId: () => restaurantId,
        getStartTime: () => startTime,
        getEndTime: () => endTime,
    };
}
exports.default = TimeSlotEntity;
