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
exports.ratings = exports.addNewRating = void 0;
const ratingEntity_1 = __importDefault(require("../../../entities/ratingEntity"));
const addNewRating = (userId, ratingData, restaurantRepostory) => __awaiter(void 0, void 0, void 0, function* () {
    const { restaurantId, rating, description } = ratingData;
    const newRatingEntity = (0, ratingEntity_1.default)(userId, restaurantId, rating, description);
    return yield restaurantRepostory.addRating(newRatingEntity);
});
exports.addNewRating = addNewRating;
const ratings = (restaurantID, restaurantRepostory) => __awaiter(void 0, void 0, void 0, function* () { return yield restaurantRepostory.getRatings({ restaurantId: restaurantID }); });
exports.ratings = ratings;
