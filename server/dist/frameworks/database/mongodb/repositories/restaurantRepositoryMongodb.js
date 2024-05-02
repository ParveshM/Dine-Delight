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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restaurantRepositoryMongodb = void 0;
const restaurant_1 = __importDefault(require("../models/restaurant"));
const rating_1 = __importDefault(require("../models/rating"));
const restaurantRepositoryMongodb = () => {
    const getRestaurantById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        return yield restaurant_1.default.findById(id).select("-password -isVerified -isApproved -isRejected -verificationToken");
    });
    const getRestaurantByemail = (email) => __awaiter(void 0, void 0, void 0, function* () {
        const restaurant = yield restaurant_1.default.findOne({
            email,
        });
        return restaurant;
    });
    const addRestaurant = (restaurantData) => __awaiter(void 0, void 0, void 0, function* () {
        const newRestaurant = new restaurant_1.default({
            restaurantName: restaurantData.getRestaurantName(),
            email: restaurantData.getEmail(),
            password: restaurantData.getPassword(),
            verificationToken: restaurantData.getVerificationToken(),
        });
        return yield newRestaurant.save();
    });
    const verifyRestaurant = (token) => __awaiter(void 0, void 0, void 0, function* () {
        return yield restaurant_1.default.findOneAndUpdate({ verificationToken: token }, { isVerified: true, verificationToken: null });
    });
    const getAllRestaurants = (paginate) => __awaiter(void 0, void 0, void 0, function* () {
        const restaurants = yield restaurant_1.default.find({
            isVerified: true,
            isApproved: true,
        })
            .skip(paginate.skip)
            .limit(paginate.limit);
        const count = yield restaurant_1.default.countDocuments({
            isVerified: true,
            isApproved: true,
        });
        return { restaurants, count };
    });
    const getListedRestaurants = (filter, sortBy, skip, page, userCooordinates) => __awaiter(void 0, void 0, void 0, function* () {
        const areaToCover = userCooordinates && userCooordinates.length === 2 ? 10000 : Infinity;
        const location = userCooordinates && (userCooordinates === null || userCooordinates === void 0 ? void 0 : userCooordinates.length) === 2
            ? userCooordinates
            : [0, 0];
        return yield restaurant_1.default.aggregate([
            {
                $geoNear: {
                    near: { type: "Point", coordinates: location },
                    distanceField: "distance",
                    maxDistance: areaToCover,
                    spherical: true,
                },
            },
            { $sort: sortBy },
            { $match: filter },
            {
                $lookup: {
                    from: "ratings",
                    let: { restaurantId: "$_id" },
                    pipeline: [
                        {
                            $match: {
                                $expr: { $eq: ["$restaurantId", "$$restaurantId"] },
                            },
                        },
                    ],
                    as: "rating",
                },
            },
            { $skip: skip },
            { $limit: page },
            {
                $project: {
                    password: 0,
                    isApproved: 0,
                    isRejected: 0,
                    isVerified: 0,
                    verificationToken: 0,
                    role: 0,
                },
            },
        ]);
    });
    const getNewRegistrations = (paginate) => __awaiter(void 0, void 0, void 0, function* () {
        const restaurants = yield restaurant_1.default.find({
            isApproved: false,
            isVerified: true,
            isRejected: false,
        })
            .skip(paginate.skip)
            .limit(paginate.limit);
        const count = yield restaurant_1.default.countDocuments({
            isApproved: false,
            isVerified: true,
            isRejected: false,
        });
        return { restaurants, count };
    });
    const updateRestaurantStatus = (id, updateFields) => __awaiter(void 0, void 0, void 0, function* () {
        return yield restaurant_1.default.findByIdAndUpdate(id, updateFields);
    });
    const updateRestaurant = (id, updateData) => __awaiter(void 0, void 0, void 0, function* () { return yield restaurant_1.default.findByIdAndUpdate(id, updateData); });
    const countRestaurants = () => __awaiter(void 0, void 0, void 0, function* () { return yield restaurant_1.default.countDocuments({ isVerified: true }); });
    const addRating = (ratingData) => __awaiter(void 0, void 0, void 0, function* () {
        return yield rating_1.default.create({
            userId: ratingData.getUserId(),
            restaurantId: ratingData.getRestaurantId(),
            rating: ratingData.getRating(),
            description: ratingData.getDescription(),
        });
    });
    const getRatings = (filter) => __awaiter(void 0, void 0, void 0, function* () { return yield rating_1.default.find(filter).populate("userId"); });
    return {
        getRestaurantById,
        getRestaurantByemail,
        addRestaurant,
        verifyRestaurant,
        getAllRestaurants,
        getNewRegistrations,
        updateRestaurant,
        updateRestaurantStatus,
        getListedRestaurants,
        countRestaurants,
        addRating,
        getRatings,
    };
};
exports.restaurantRepositoryMongodb = restaurantRepositoryMongodb;
