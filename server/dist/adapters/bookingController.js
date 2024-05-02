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
const reservation_1 = require("../app/use-cases/user/Booking/reservation");
const httpStatus_1 = require("../types/httpStatus");
const userAuth_1 = require("../app/use-cases/user/auth/userAuth");
const cancellation_1 = require("../app/use-cases/user/Booking/cancellation");
const preorderFood_1 = require("../app/use-cases/user/Booking/preorderFood");
const bookingController = (reservationServiceInterface, reservationServiceImpl, bookingDbRepository, bookingDbRepositoryImpl, restaurantDbRepository, restaurantDbRepositoryImpl, tableDbRepository, tableDbRepositoryImpl, userDbRepository, userDbRepositoryImpl, tablSlotDbRepository, tablSlotDbRepositoryImpl) => {
    const dbBookingRepository = bookingDbRepository(bookingDbRepositoryImpl());
    const restaurantRepository = restaurantDbRepository(restaurantDbRepositoryImpl());
    const dbTableRepository = tableDbRepository(tableDbRepositoryImpl());
    const userRepository = userDbRepository(userDbRepositoryImpl());
    const dbTableSlotRepository = tablSlotDbRepository(tablSlotDbRepositoryImpl());
    const reservationService = reservationServiceInterface(reservationServiceImpl());
    const reserveTable = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.user;
            const createBooking = yield (0, reservation_1.reserveATable)(req.body, userId, reservationService, dbBookingRepository, restaurantRepository, dbTableRepository, dbTableSlotRepository, userRepository);
            if (createBooking.paymentMethod === "Online") {
                const user = yield (0, userAuth_1.getUserById)(userId, userRepository);
                const sessionId = yield (0, reservation_1.createPayment)(user === null || user === void 0 ? void 0 : user.name, user === null || user === void 0 ? void 0 : user.email, createBooking.bookingId, createBooking.totalAmount);
                res.status(httpStatus_1.HttpStatus.OK).json({
                    success: true,
                    message: "Booking created successfully",
                    id: sessionId,
                });
            }
            else {
                res.status(httpStatus_1.HttpStatus.OK).json({
                    success: true,
                    message: "Booking created successfully using Wallet",
                    booking: createBooking,
                });
            }
        }
        catch (error) {
            next(error);
        }
    });
    /**
     * *METHOD :PATCH
     * * Update payment status and table slot information if payment status is failed
     */
    const updatePaymentStatus = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { paymentStatus } = req.body;
            yield (0, reservation_1.updateBookingStatus)(id, paymentStatus, dbBookingRepository, dbTableSlotRepository);
            res
                .status(httpStatus_1.HttpStatus.OK)
                .json({ success: true, message: "Booking status updated" });
        }
        catch (error) {
            next(error);
        }
    });
    /**
     * *METHOD :GET
     * * Retrieve all bookings done by user
     */
    const getAllbookings = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userID = req.user;
            const bookings = yield (0, reservation_1.getBookings)(userID, dbBookingRepository);
            res.status(httpStatus_1.HttpStatus.OK).json({
                success: true,
                message: "Bookings fetched successfully",
                bookings,
            });
        }
        catch (error) {
            next(error);
        }
    });
    /*
     * * METHOD :GET
     * * Retrieve booking details
     */
    const getBookingDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { bookingID } = req.params;
            const userID = req.user;
            const { bookingDetails, preOrder } = yield (0, reservation_1.getBookingByBookingId)(bookingID, dbBookingRepository);
            let reviews = null;
            if ((bookingDetails === null || bookingDetails === void 0 ? void 0 : bookingDetails.restaurantId) && userID) {
                reviews = yield (0, reservation_1.getReviewsByUserId)(userID, bookingDetails.restaurantId, restaurantRepository);
            }
            res.status(httpStatus_1.HttpStatus.OK).json({
                success: true,
                message: "Bookings details fetched successfully",
                bookingDetails,
                reviews,
                preOrder,
            });
        }
        catch (error) {
            next(error);
        }
    });
    /*
     * * METHOD :POST
     * * Cancel booking and update the amount in wallet
     */
    const cancelBooking = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userID = req.user;
            const { bookingID } = req.params;
            const updateBooking = yield (0, cancellation_1.cancelBookingAndUpdateWallet)(userID, bookingID, dbBookingRepository, userRepository);
            res.status(httpStatus_1.HttpStatus.OK).json({
                success: true,
                message: "Booking cancelled successfully",
                booking: updateBooking,
            });
        }
        catch (error) {
            next(error);
        }
    });
    /*
     * * METHOD :POST
     * * Update preorder
     */
    const updatePreOrderedFood = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { bookingId, cartItems } = req.body;
            yield (0, preorderFood_1.createPreOrderForBooking)(bookingId, cartItems, dbBookingRepository);
            res.status(httpStatus_1.HttpStatus.OK).json({
                success: true,
                message: "Preorder placed successfully",
            });
        }
        catch (error) {
            next(error);
        }
    });
    /*
     * * METHOD :DELETE
     * * Delete preorder item
     */
    const deletePreOrderedFood = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { bookingId, cartItemId } = req.body;
            yield (0, preorderFood_1.deletePreOrderForBooking)(bookingId, cartItemId, dbBookingRepository);
            res.status(httpStatus_1.HttpStatus.OK).json({
                success: true,
                message: "Item deleted successfully",
            });
        }
        catch (error) {
            next(error);
        }
    });
    return {
        reserveTable,
        updatePaymentStatus,
        getAllbookings,
        cancelBooking,
        getBookingDetails,
        updatePreOrderedFood,
        deletePreOrderedFood,
    };
};
exports.default = bookingController;
