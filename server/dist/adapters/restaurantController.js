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
const authRestaurant_1 = require("../app/use-cases/restaurant/authRestaurant");
const httpStatus_1 = require("../types/httpStatus");
const updateRestaurant_1 = require("../app/use-cases/restaurant/updateRestaurant");
const reservations_1 = require("../app/use-cases/restaurant/reservations");
const reservation_1 = require("../app/use-cases/user/Booking/reservation");
const dashboard_1 = require("../app/use-cases/restaurant/dashboard");
const order_1 = require("../app/use-cases/user/foodOrder/order");
const restaurantController = (authServiceInterface, authServiceImpl, restaurantDbRepository, restaurantDbRepositoryImpl, bookingDbRepository, bookingDbRepositoryImpl, userDbRepository, userDbRepositoryImpl, orderDbRepository, orderDbRepositoryImpl) => {
    const authService = authServiceInterface(authServiceImpl());
    const dbRepositoryRestaurants = restaurantDbRepository(restaurantDbRepositoryImpl());
    const bookingRepository = bookingDbRepository(bookingDbRepositoryImpl());
    const userRepository = userDbRepository(userDbRepositoryImpl());
    const orderRepository = orderDbRepository(orderDbRepositoryImpl());
    /*
     * METHOD: POST
     * Register new restaurant to the system
     */
    const signup = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const restaurantdata = req.body;
            const registerRestaurant = yield (0, authRestaurant_1.addNewRestaurant)(restaurantdata, dbRepositoryRestaurants, authService);
            if (registerRestaurant) {
                return res.status(httpStatus_1.HttpStatus.OK).json({
                    success: true,
                    message: "Registration success, please verify your email",
                });
            }
        }
        catch (error) {
            next(error);
        }
    });
    /*
     * METHOD: GET
     * Verify newly registerd restaurant
     */
    const verifyToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { token } = req.params;
            const verifying = yield (0, authRestaurant_1.verifyAccount)(token, dbRepositoryRestaurants);
            if (verifying)
                return res.status(httpStatus_1.HttpStatus.OK).json({
                    success: true,
                    message: "Account is verified, you can login after admin approval.",
                });
        }
        catch (error) {
            next(error);
        }
    });
    /*
     * METHOD: POST
     * Login restaurant account with credentials
     */
    const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const { accessToken, refreshToken, isEmailExist } = yield (0, authRestaurant_1.restaurantLogin)(email, password, dbRepositoryRestaurants, authService);
            return res.status(httpStatus_1.HttpStatus.OK).json({
                success: true,
                message: "Login successful",
                restaurant: isEmailExist,
                access_token: accessToken,
                refresh_token: refreshToken,
            });
        }
        catch (error) {
            next(error);
        }
    });
    /*
     * METHOD: PUT
     * Update restaurant account details
     */
    const updateRestaurantDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.seller;
            yield (0, updateRestaurant_1.updateRestaurantInfo)(id, req.body, dbRepositoryRestaurants);
            res.json({ success: true, message: "Restaurants updated successfully" });
        }
        catch (error) {
            next(error);
        }
    });
    /*
     * METHOD: GET
     * GET restaurant  details
     */
    const get_restaurantDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = req.seller;
            const restaurant = yield (0, updateRestaurant_1.getRestaurantDetails)(id, dbRepositoryRestaurants);
            return res.status(httpStatus_1.HttpStatus.OK).json({ success: true, restaurant });
        }
        catch (error) {
            next(error);
        }
    });
    /*
     * METHOD: GET
     * Retriving all the reservations to the restaurant
     */
    const reservations = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const restaurantID = req.seller;
            console.log("rest id", req.seller);
            const page = (_a = parseInt(req.query.page)) !== null && _a !== void 0 ? _a : 1;
            const status = req.query.status;
            const limit = 10;
            const skip = (page - 1) * limit;
            const { bookings, count } = yield (0, reservations_1.getRestaurantReservations)(restaurantID, status, skip, limit, bookingRepository);
            return res.status(httpStatus_1.HttpStatus.OK).json({
                success: true,
                count,
                limit,
                reservations: bookings,
                message: "Reservations fetched successfully",
            });
        }
        catch (error) {
            next(error);
        }
    });
    /*
     * METHOD: GET
     * view booking details
     */
    const getReservationbybookingId = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { bookingID } = req.params;
            const { bookingDetails, preOrder } = yield (0, reservation_1.getBookingByBookingId)(bookingID, bookingRepository);
            return res.status(httpStatus_1.HttpStatus.OK).json({
                success: true,
                message: "bookingDetails fetched successfully",
                bookingDetails,
                preOrder,
            });
        }
        catch (error) {
            next(error);
        }
    });
    /**
     * * METHOD:PATCH
     * * update booking details by seller
     */
    const updateReservations = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { bookingStatus, userID, foodStatus } = req.body;
            const { bookingID } = req.params;
            const upda = yield (0, reservations_1.updateReservationData)(bookingID, bookingStatus, foodStatus, userID, bookingRepository, userRepository);
            res
                .status(httpStatus_1.HttpStatus.OK)
                .json({ success: true, message: "Booking updated successfully" });
        }
        catch (error) {
            next(error);
        }
    });
    const restaurantDashboard = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { graphData, bookings, bookingStatistics } = yield (0, dashboard_1.dashBoardData)(req.seller, bookingRepository);
            res.status(httpStatus_1.HttpStatus.OK).json({
                success: true,
                graphData,
                bookings,
                bookingStatistics,
                message: "Dashboard data fetched successfully",
            });
        }
        catch (error) {
            next(error);
        }
    });
    /**
     * * METHOD:GET
     * * Generate Report for restaurant
     */
    const generateReports = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { startDate, endDate, status } = req.query;
            const restaurantID = req.seller;
            const report = yield (0, dashboard_1.generateRestaurantReport)(restaurantID, startDate, endDate, bookingRepository, status);
            res.status(httpStatus_1.HttpStatus.OK).json({
                success: true,
                message: "Report generated successfully",
                report,
            });
        }
        catch (error) {
            next(error);
        }
    });
    /**
     * * METHOD:GET
     * * Get orders for the  restaurant
     */
    const getOrders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const restaurantID = req.seller;
            const page = parseInt(req.query.page) || 1;
            const limit = 2;
            const skip = (page - 1) * limit;
            const { orders, count } = yield (0, order_1.getAllOrders)({ restaurant: restaurantID }, { skip, limit }, orderRepository);
            res.status(httpStatus_1.HttpStatus.OK).json({
                success: true,
                message: "orders fetched successfully",
                orders,
                limit,
                count,
            });
        }
        catch (error) {
            next(error);
        }
    });
    /**
     * * METHOD:PATCH
     * * Update order status
     */
    const updateOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { orderId } = req.params;
            const { status } = req.body;
            const order = yield (0, order_1.updateOrderItem)(orderId, { status }, orderRepository);
            res.status(httpStatus_1.HttpStatus.OK).json({
                success: true,
                message: "order updated successfully",
                order,
            });
        }
        catch (error) {
            next(error);
        }
    });
    return {
        signup,
        verifyToken,
        login,
        updateRestaurantDetails,
        get_restaurantDetails,
        reservations,
        updateReservations,
        getReservationbybookingId,
        generateReports,
        restaurantDashboard,
        getOrders,
        updateOrder,
    };
};
exports.default = restaurantController;
