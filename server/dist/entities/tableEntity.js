"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function tableEntity(tableNumber, restaurantId, capacity, location) {
    return {
        getTableNumber: () => tableNumber,
        getRestaurantId: () => restaurantId,
        getCapacity: () => capacity,
        getLocation: () => location,
    };
}
exports.default = tableEntity;
