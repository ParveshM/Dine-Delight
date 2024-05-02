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
exports.generateReportforAdmin = exports.getDashBoardData = exports.getRestaurants = exports.getUsers = void 0;
const getUsers = (paginate, userDbRepository) => __awaiter(void 0, void 0, void 0, function* () { return yield userDbRepository.getAllUsers(paginate); });
exports.getUsers = getUsers;
const getRestaurants = (new_registrations, paginate, restaurantDbRepository) => __awaiter(void 0, void 0, void 0, function* () {
    if (new_registrations) {
        return yield restaurantDbRepository.getNewRegisteredRestaurants(paginate);
    }
    return yield restaurantDbRepository.getAllRestaurants(paginate);
});
exports.getRestaurants = getRestaurants;
const getDashBoardData = (status, skip, limit, userRepository, restaurantRepository, bookingRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = {};
    if (status) {
        filter.bookingStatus = status;
    }
    const totalUsers = yield userRepository.countUsers();
    const totalRestaurants = yield restaurantRepository.countRestaurants();
    const { graphData, totalProfit } = yield bookingRepository.calculateProfit();
    const totalBookings = yield bookingRepository.countBookings();
    const { count, bookings } = yield bookingRepository.paginatedBookings(filter, skip, limit);
    return {
        totalRestaurants,
        totalBookings,
        totalProfit,
        totalUsers,
        graphData,
        bookings,
        count,
    };
});
exports.getDashBoardData = getDashBoardData;
const generateReportforAdmin = (startDate, endDate, bookingRepository) => __awaiter(void 0, void 0, void 0, function* () { return yield bookingRepository.getAdminReport(startDate, endDate); });
exports.generateReportforAdmin = generateReportforAdmin;
