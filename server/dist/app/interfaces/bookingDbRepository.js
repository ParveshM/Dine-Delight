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
exports.bookingDbRepository = void 0;
const bookingDbRepository = (repository) => {
    const createBooking = (reservationData) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.createBooking(reservationData); });
    const getBookingById = (bookingId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getBookingById(bookingId); });
    const updateBookingDetails = (bookingId, updatingData) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.updateBooking(bookingId, updatingData); });
    const paginatedBookings = (filter, skip, limit) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.paginatedBookings(filter, skip, limit); });
    const bookings = (filter) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.bookings(filter); });
    const countBookings = () => __awaiter(void 0, void 0, void 0, function* () { return yield repository.countBookings(); });
    const calculateProfit = () => __awaiter(void 0, void 0, void 0, function* () { return yield repository.totalAdminPayment(); });
    const getAdminReport = (startDate, endDate) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getAdminReport(startDate, endDate); });
    const getRestaurantReport = (filter) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getRestaurantReport(filter); });
    const restaurantGraphData = (restaurantId) => repository.restaurantGraphData(restaurantId);
    const createPreOrder = (bookingId, preOrderData) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.createPreorderedFood(bookingId, preOrderData); });
    const getOrderItem = (filter) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getOrderItem(filter); });
    const deleteOrderItem = (filter) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.deletOrderItem(filter); });
    const getPreoOrderbyBookingId = (bookingId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getPreOrder(bookingId); });
    const updatePreOrderItem = (filter, updateData) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.updatePreOrderItem(filter, updateData); });
    return {
        createBooking,
        getBookingById,
        updateBookingDetails,
        paginatedBookings,
        bookings,
        countBookings,
        calculateProfit,
        createPreOrder,
        getPreoOrderbyBookingId,
        updatePreOrderItem,
        getOrderItem,
        deleteOrderItem,
        getAdminReport,
        getRestaurantReport,
        restaurantGraphData,
    };
};
exports.bookingDbRepository = bookingDbRepository;
