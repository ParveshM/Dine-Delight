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
exports.dashBoardData = exports.generateRestaurantReport = void 0;
const mongoose_1 = require("mongoose");
const generateRestaurantReport = (restaurantID, startDate, endDate, bookingRepository, status) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = {
        restaurantId: new mongoose_1.Types.ObjectId(restaurantID),
        createdAt: {
            $gte: new Date(startDate),
            $lte: new Date(endDate),
        },
    };
    if (status)
        filter.bookingStatus = status;
    return yield bookingRepository.getRestaurantReport(filter);
});
exports.generateRestaurantReport = generateRestaurantReport;
const dashBoardData = (restaurantID, bookingRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const skip = 0;
    const limit = 5;
    const { bookings } = yield bookingRepository.paginatedBookings({ restaurantId: restaurantID }, skip, limit);
    const { graphData, bookingStatistics } = yield bookingRepository.restaurantGraphData(restaurantID);
    return { graphData, bookings, bookingStatistics };
});
exports.dashBoardData = dashBoardData;
