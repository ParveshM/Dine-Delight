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
exports.restaurantDbRepository = void 0;
const restaurantDbRepository = (repository) => {
    const getRestaurantById = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getRestaurantById(id); });
    const getRestaurantByemail = (email) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getRestaurantByemail(email); });
    const addRestaurant = (restaurantData) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.addRestaurant(restaurantData); });
    const verifyRestaurant = (token) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.verifyRestaurant(token); });
    const getAllRestaurants = (paginate) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getAllRestaurants(paginate); });
    const getNewRegisteredRestaurants = (paginate) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getNewRegistrations(paginate); });
    const updateRestaurant = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.updateRestaurant(id, updateData); });
    const updateRestaurantStatus = (id, updateFields) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.updateRestaurantStatus(id, updateFields);
    });
    const getListedRestaurants = (filter, sortBy, skip, page, coordinates) => __awaiter(void 0, void 0, void 0, function* () {
        return yield repository.getListedRestaurants(filter, sortBy, skip, page, coordinates);
    });
    const countRestaurants = () => __awaiter(void 0, void 0, void 0, function* () { return yield repository.countRestaurants(); });
    const addRating = (ratingData) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.addRating(ratingData); });
    const getRatings = (filter) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getRatings(filter); });
    return {
        getRestaurantById,
        getRestaurantByemail,
        addRestaurant,
        verifyRestaurant,
        getAllRestaurants,
        getNewRegisteredRestaurants,
        updateRestaurant,
        updateRestaurantStatus,
        getListedRestaurants,
        countRestaurants,
        addRating,
        getRatings,
    };
};
exports.restaurantDbRepository = restaurantDbRepository;
