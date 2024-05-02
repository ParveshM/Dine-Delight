"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function restaurantEntity(restaurantName, email, password, verificationToken) {
    return {
        getRestaurantName: () => restaurantName,
        getEmail: () => email,
        getPassword: () => password,
        getVerificationToken: () => verificationToken,
    };
}
exports.default = restaurantEntity;
