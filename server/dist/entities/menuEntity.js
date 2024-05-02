"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function menuEntity(name, price, image, category, isVegetarian, restaurantId, tags) {
    return {
        getName: () => name,
        getPrice: () => price,
        getImage: () => image,
        getCategory: () => category,
        isVegetarian: () => isVegetarian,
        getRestaurantId: () => restaurantId,
        getTags: () => tags || [],
    };
}
exports.default = menuEntity;
