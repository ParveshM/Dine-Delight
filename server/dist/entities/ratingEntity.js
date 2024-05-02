"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function ratingEntity(userId, restaurantId, rating, description) {
    return {
        getUserId: () => userId,
        getRestaurantId: () => restaurantId,
        getRating: () => rating,
        getDescription: () => description,
    };
}
exports.default = ratingEntity;
