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
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userAuth_1 = require("../app/use-cases/user/auth/userAuth");
const httpStatus_1 = require("../types/httpStatus");
const getRestaurants_1 = require("../app/use-cases/user/read & update/getRestaurants");
const getTable_1 = require("../app/use-cases/user/read & update/getTable");
const profile_1 = require("../app/use-cases/user/read & update/profile");
const ratings_1 = require("../app/use-cases/restaurant/ratings");
const banner_usecase_1 = require("../app/use-cases/Admin/banner-usecase");
const order_1 = require("../app/use-cases/user/foodOrder/order");
// Controller will be passing all the necessaary parameers to the repositories
const userController = (authServiceInterface, // parameters from router
authServiceImpl, userDbRepository, userRepositoryImpl, restaurantDbRepository, restaurantDbRepositoryImpl, tableSlotDbRepository, tableSlotDbRepositoryImpl, tableDbRepository, tableDbRepositoryImpl, adminDbRepository, adminDbRepositoryImpl, orderDbRepository, orderDbRepositoryImpl) => {
    const dbRepositoryUser = userDbRepository(userRepositoryImpl());
    const restaurantRepository = restaurantDbRepository(restaurantDbRepositoryImpl());
    const tableSlotRepository = tableSlotDbRepository(tableSlotDbRepositoryImpl());
    const tableRepository = tableDbRepository(tableDbRepositoryImpl());
    const adminRepository = adminDbRepository(adminDbRepositoryImpl());
    const OrderRepository = orderDbRepository(orderDbRepositoryImpl());
    const authService = authServiceInterface(authServiceImpl());
    /**
     ** method : POST
     */
    // Register new User
    const registerUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = req.body;
            const newUser = yield (0, userAuth_1.userRegister)(user, dbRepositoryUser, authService);
            res.json({
                message: "User registration successful,please verify email",
                newUser,
            });
        }
        catch (error) {
            next(error);
        }
    });
    /**
     ** method : POST
     */
    // Verify OTP
    const verifyOtp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { otp, userId } = req.body;
            const isVerified = yield (0, userAuth_1.verifyOtpUser)(otp, userId, dbRepositoryUser);
            if (isVerified) {
                return res
                    .status(httpStatus_1.HttpStatus.OK)
                    .json({ message: "User account verified,please login" });
            }
        }
        catch (error) {
            next(error);
        }
    });
    /**
     ** method : POST
     */
    // Resend OTP
    const resendOtp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { userId } = req.body;
            yield (0, userAuth_1.deleteOtp)(userId, dbRepositoryUser, authService);
            res.json({ message: "New otp sent to email" });
        }
        catch (error) {
            next(error);
        }
    });
    /**
     ** method : POST
     */
    // User login with credentials and create access and refresh token for authorization
    const userLogin = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { access_token: access, refresh_token: refresh } = req.cookies;
            if (access || refresh) {
                res.clearCookie("access_token");
                res.clearCookie("refresh_token");
            }
            const { accessToken, refreshToken, isEmailExist } = yield (0, userAuth_1.login)(req.body, dbRepositoryUser, authService);
            // setting access token in the cookie
            res.cookie("access_token", accessToken, {
                httpOnly: true,
                secure: true,
                expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            });
            res.cookie("refresh_token", refreshToken, {
                httpOnly: true,
                secure: true,
                expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            });
            res
                .status(httpStatus_1.HttpStatus.OK)
                .json({ message: "login success", user: isEmailExist });
        }
        catch (error) {
            next(error);
        }
    }));
    /**
     ** method : POST
     ** Google Signin with user credentials
     */
    const googleSignIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { access_token: access, refresh_token: refresh } = req.cookies;
            if (access || refresh) {
                res.clearCookie("access_token");
                res.clearCookie("refresh_token");
            }
            const userData = req.body.user;
            const { accessToken, refreshToken, isEmailExist, createdUser } = yield (0, userAuth_1.authenticateGoogleSignInUser)(userData, dbRepositoryUser, authService);
            res.cookie("access_token", accessToken, {
                httpOnly: true,
                secure: true,
                expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            });
            res.cookie("refresh_token", refreshToken, {
                httpOnly: true,
                secure: true,
                expires: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
            });
            const user = isEmailExist ? isEmailExist : createdUser;
            res.status(httpStatus_1.HttpStatus.OK).json({ message: "login success", user });
        }
        catch (error) {
            next(error);
        }
    });
    /**
     ** METHOD:POST
     ** Send verification code to the forget password requested email address
     */
    const forgotPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email } = req.body;
            console.log(email);
            yield (0, userAuth_1.sendResetVerificationCode)(email, dbRepositoryUser, authService);
            return res.status(httpStatus_1.HttpStatus.OK).json({
                success: true,
                message: "Reset password code sent to your email.",
            });
        }
        catch (error) {
            next(error);
        }
    });
    /**
     ** METHOD:POST
     ** Verify the code ,and reset the password
     */
    const resetPassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { password } = req.body;
            const { token } = req.params;
            yield (0, userAuth_1.verifyTokenAndRestPassword)(token, password, dbRepositoryUser, authService);
            return res.status(httpStatus_1.HttpStatus.OK).json({
                success: true,
                message: "Reset password success,you can login with your new password",
            });
        }
        catch (error) {
            next(error);
        }
    });
    const getRestaurants = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const q = req.query.q;
            const location = req.query.location;
            const page = parseInt(req.query.page);
            const cost = parseInt(req.query.cost);
            // const rating = req.query.rating as string;
            const sort = req.query.sort;
            const sortOrder = req.query.sortOrder === "desc" ? -1 : 1;
            const filters = {};
            if (q)
                filters.restaurantName = new RegExp(q !== null && q !== void 0 ? q : "", "i");
            // if (rating) filters.rating = { $gte: rating };
            if (cost) {
                if (cost < 300) {
                    filters.tableRatePerPerson = { $lt: 300 };
                }
                else if (cost >= 300 && cost < 600) {
                    filters.tableRatePerPerson = { $gte: 300, $lt: 600 };
                }
                else {
                    filters.tableRatePerPerson = { $gte: 600 };
                }
            }
            const sortBy = {};
            sort ? (sortBy[sort] = sortOrder) : (sortBy["createdAt"] = sortOrder);
            const limit = 2;
            const skip = (page - 1) * limit;
            const restaurants = yield (0, getRestaurants_1.getAllListedRestaurants)(filters, sortBy, skip, limit, location, restaurantRepository);
            res.status(200).json({ success: true, restaurants });
        }
        catch (error) {
            next(error);
        }
    });
    const getSingleRestaurant = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const { restaurantID } = req.params;
            const guest = typeof ((_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.guest) === "string" ? parseInt(req.query.guest) : 2;
            const date = req.query.date;
            const { restaurant, tableSlots, ratings, allSlots: dateSlots, } = yield (0, getRestaurants_1.getSingleRestaurantById)(restaurantID, guest, date, restaurantRepository, tableSlotRepository);
            return res.status(httpStatus_1.HttpStatus.OK).json({
                success: true,
                message: "Restaurant details fetched successfully",
                restaurant,
                tableSlots,
                dateSlots,
                ratings,
            });
        }
        catch (error) {
            next(error);
        }
    });
    /**
     * * METHOD :GET
     * * @param tableID {string}
     * * Retrieve table details by Id
     */
    const tableDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { tableID } = req.params;
            const userId = req.query.userId;
            const tableData = yield (0, getTable_1.getTableDetails)(tableID, tableRepository);
            const user = yield (0, userAuth_1.getUserById)(userId, dbRepositoryUser);
            res.status(200).json({ success: true, tableData, user });
        }
        catch (error) {
            next(error);
        }
    });
    /**
     * * METHOD :GET
     * * Retrieve  user profile , wallet
     */
    const userProfile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.user;
            const { user, wallet, transactions } = yield (0, profile_1.getUserProfile)(userId, dbRepositoryUser);
            res.status(200).json({ success: true, user, wallet, transactions });
        }
        catch (error) {
            next(error);
        }
    });
    /**
     * * METHOD :GET
     * * Retrieve  user Info
     * */
    const userInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { user } = yield (0, profile_1.getUserProfile)(id, dbRepositoryUser);
            res.status(200).json({ success: true, user });
        }
        catch (error) {
            next(error);
        }
    });
    /**
     * * METHOD :PATCH
     * * update user profile
     */
    const updateUserInfo = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.user;
            const updateData = req.body;
            console.log(req.body);
            const user = yield (0, profile_1.updateUser)(userId, updateData, dbRepositoryUser);
            res
                .status(200)
                .json({ success: true, user, message: "Profile updated successfully" });
        }
        catch (error) {
            next(error);
        }
    });
    const getTransactions = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.user;
            const transaction = yield (0, profile_1.WalletTransactions)(userId, dbRepositoryUser);
            res.status(200).json({
                success: true,
                transaction,
                message: "Transactions fetched successfully",
            });
        }
        catch (error) {
            next(error);
        }
    });
    /**
     * * METHOD:POST
     * * Add new rating to the restaurant
     */
    const createNewRating = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.user;
            yield (0, ratings_1.addNewRating)(userId, req.body, restaurantRepository);
            res
                .status(httpStatus_1.HttpStatus.OK)
                .json({ success: true, message: "Rating added successfully" });
        }
        catch (error) {
            next(error);
        }
    });
    /**
     * * METHOD:PATCH
     * * Update bookmarks
     */
    const updateBookmarks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.user;
            const action = req.query.action;
            const { restaurantId } = req.body;
            yield (0, profile_1.addOrRemoveBookmarks)(userId, action, restaurantId, dbRepositoryUser);
            res.status(httpStatus_1.HttpStatus.OK).json({
                success: true,
                message: `${action === "addToBookmarks" ? "Added to " : "Removed from "} Bookmarks`,
            });
        }
        catch (error) {
            next(error);
        }
    });
    /**
     * * METHOD:POST
     * * Update email preference
     */
    const updateEmailPreference = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { restaurantId, userId } = req.body;
            const isUpdated = yield (0, profile_1.updateEmailSubscription)(restaurantId, userId, dbRepositoryUser);
            res.status(httpStatus_1.HttpStatus.OK).json({
                success: true,
                message: "Subcription updated successfully",
            });
        }
        catch (error) {
            next(error);
        }
    });
    /**
     * * METHOD:GET
     * * Get banners for home page
     */
    const getBanners = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const banners = yield (0, banner_usecase_1.getAllBanners)({ isActive: true }, adminRepository);
            res.status(httpStatus_1.HttpStatus.OK).json({
                success: true,
                message: "Banners fetched successfully",
                banners,
            });
        }
        catch (error) {
            next(error);
        }
    });
    /**
     * * METHOD:POST
     * * create new food order
     */
    const newFoodOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const order = yield (0, order_1.createNewOrder)(req.user, req.body, OrderRepository);
            res.status(httpStatus_1.HttpStatus.OK).json({
                success: true,
                message: "order placed successfully",
                order,
            });
        }
        catch (error) {
            next(error);
        }
    });
    /**
     * * METHOD:GET
     * * get all the orders done by user
     */
    const orders = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const userId = req.user;
            const skip = 0;
            const limit = 0;
            const { orders } = yield (0, order_1.getAllOrders)({ user: userId }, { skip, limit }, OrderRepository);
            res.status(httpStatus_1.HttpStatus.OK).json({
                success: true,
                message: "orders fetched successfully",
                orders,
            });
        }
        catch (error) {
            next(error);
        }
    });
    /**
     * * METHOD:PUT
     * * update orders done by user
     */
    const updateOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { orderId } = req.query;
            const order = yield (0, order_1.addMoreItemToOrder)(orderId, req.body, OrderRepository);
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
        registerUser,
        verifyOtp,
        resendOtp,
        userLogin,
        googleSignIn,
        forgotPassword,
        resetPassword,
        getRestaurants,
        getSingleRestaurant,
        tableDetails,
        userInfo,
        userProfile,
        updateUserInfo,
        getTransactions,
        createNewRating,
        updateBookmarks,
        updateEmailPreference,
        getBanners,
        newFoodOrder,
        orders,
        updateOrder,
    };
};
exports.default = userController;
