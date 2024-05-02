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
exports.getSingleRestaurantById = exports.getAllListedRestaurants = void 0;
const getAllListedRestaurants = (queryFilters, sortBy, skip, limit, userCoordinates, restaurantRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = Object.assign({ isListed: true }, queryFilters);
    const long_lat = userCoordinates && userCoordinates.map(Number);
    const coordinates = userCoordinates
        ? [long_lat[0], long_lat[1]]
        : null;
    return yield restaurantRepository.getListedRestaurants(filter, sortBy, skip, limit, coordinates);
});
exports.getAllListedRestaurants = getAllListedRestaurants;
const getSingleRestaurantById = (restaurantID, guest, date, restaurantRepository, tableSlotRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const capacity = guest !== null && guest !== void 0 ? guest : 2;
    const startTime = "$startTime";
    let currentDate, endDate;
    currentDate = endDate = date !== null && date !== void 0 ? date : new Date();
    const restaurant = yield restaurantRepository.getRestaurantById(restaurantID);
    const tableSlots = yield tableSlotRepository.getAvailableTableSlotsByFilter(restaurantID, capacity, startTime, currentDate, endDate);
    const allSlots = yield tableSlotRepository.getAvailableTableSlotsByFilter(restaurantID, capacity, startTime, currentDate);
    const ratings = yield restaurantRepository.getRatings({
        restaurantId: restaurantID,
    });
    return { restaurant, tableSlots, ratings, allSlots };
});
exports.getSingleRestaurantById = getSingleRestaurantById;
