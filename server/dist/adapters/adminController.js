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
const adminAuth_1 = require("../app/use-cases/Admin/adminAuth");
const adminRead_1 = require("../app/use-cases/Admin/adminRead");
const httpStatus_1 = require("../types/httpStatus");
const adminUpdate_1 = require("../app/use-cases/Admin/adminUpdate");
const banner_usecase_1 = require("../app/use-cases/Admin/banner-usecase");
// adminAuthController
exports.default = (authServiceInterface, authServiceImpl, userDbRepository, userDbRepositoryImpl, restaurantDbRepository, restaurantDbRepositoryImpl, bookingDbRepository, bookingDbRepositoryImpl, adminDbRepository, adminDbRepositoryImpl) => {
    const dbUserRepository = userDbRepository(userDbRepositoryImpl());
    const dbResaurantRepository = restaurantDbRepository(restaurantDbRepositoryImpl());
    const bookingRepository = bookingDbRepository(bookingDbRepositoryImpl());
    const adminRepository = adminDbRepository(adminDbRepositoryImpl());
    const authService = authServiceInterface(authServiceImpl());
    /*
     * METHOD:POST
     * Admin login with Credentials
     */
    const adminLogin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { email, password } = req.body;
            const { accessToken, refreshToken } = yield (0, adminAuth_1.loginAdmin)(email, password, authService);
            return res.status(httpStatus_1.HttpStatus.OK).json({
                success: true,
                message: "Admin login success",
                admin: { name: "Admin User", role: "admin" },
                access_token: accessToken,
                refresh_token: refreshToken,
            });
        }
        catch (error) {
            next(error);
        }
    });
    /*
     * METHOD:GET
     * Retrieve all the users from db
     */
    const getAllUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const page = (_a = parseInt(req.query.page)) !== null && _a !== void 0 ? _a : 1;
            const limit = 1;
            const skip = (page - 1) * limit;
            const { users, count } = yield (0, adminRead_1.getUsers)({ skip, limit }, dbUserRepository);
            return res
                .status(httpStatus_1.HttpStatus.OK)
                .json({ success: true, users, limit, count });
        }
        catch (error) {
            next(error);
        }
    });
    /*
     * METHOD:GET
     * Retrieve all the restaurants in the system
     */
    const getAllRestaurants = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _b;
        try {
            const page = (_b = parseInt(req.query.page)) !== null && _b !== void 0 ? _b : 1;
            const limit = parseInt(req.query.limit) || 10;
            const skip = (page - 1) * limit;
            const new_registrations = req.query.new_registrations; // if there is a query return the new registration
            const { restaurants, count } = yield (0, adminRead_1.getRestaurants)(new_registrations, { skip, limit }, dbResaurantRepository);
            return res
                .status(httpStatus_1.HttpStatus.OK)
                .json({ success: true, restaurants, count, limit });
        }
        catch (error) {
            next(error);
        }
    });
    /*
     * METHOD:PATCH
     * Block or Unblock user
     */
    const userBlock = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            yield (0, adminUpdate_1.blockUser)(id, dbUserRepository);
            return res.status(httpStatus_1.HttpStatus.OK).json({
                success: true,
                message: "User block status updated successfully",
            });
        }
        catch (error) {
            next(error);
        }
    });
    /*
     * METHOD:PATCH
     * Approve/reject restaurant and inform through email
     */
    const validateRestaurant = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const { action } = req.body;
            // if request body action is apporved , approve the registration
            if (action === "approved") {
                yield (0, adminUpdate_1.updateRestaurantApproval)(id, dbResaurantRepository);
                return res
                    .status(httpStatus_1.HttpStatus.OK)
                    .json({ success: true, message: "Restaurant approved successfully" });
            }
            else {
                yield (0, adminUpdate_1.updateRestaurantRejected)(id, dbResaurantRepository);
                res
                    .status(httpStatus_1.HttpStatus.OK)
                    .json({ success: true, message: "Restaurant rejected successfully" });
            }
        }
        catch (error) {
            next(error);
        }
    });
    /*
     * METHOD:PATCH
     * List or unlist restaurants
     */
    const listRestaurant = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            yield (0, adminUpdate_1.updateRestaurantListing)(id, dbResaurantRepository);
            res
                .status(httpStatus_1.HttpStatus.OK)
                .json({ success: true, message: "status updated successfully" });
        }
        catch (error) {
            next(error);
        }
    });
    /*
     * METHOD:GET
     * Admin dashboard details
     */
    const dashboardDetails = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _c;
        try {
            const page = (_c = parseInt(req.query.page)) !== null && _c !== void 0 ? _c : 1;
            const status = req.query.status;
            const limit = 1;
            const skip = (page - 1) * limit;
            const { totalUsers, totalBookings, totalRestaurants, totalProfit, graphData, bookings, count, } = yield (0, adminRead_1.getDashBoardData)(status, skip, limit, dbUserRepository, dbResaurantRepository, bookingRepository);
            res.status(httpStatus_1.HttpStatus.OK).json({
                success: true,
                totalUsers,
                totalBookings,
                totalRestaurants,
                totalProfit,
                graphData,
                bookings,
                count,
                limit,
                message: "Dashboard data fetched successfully",
            });
        }
        catch (error) {
            next(error);
        }
    });
    /*
     * METHOD:GET
     * Generate reports for admin
     */
    const generateReport = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { startDate, endDate } = req.query;
            const report = yield (0, adminRead_1.generateReportforAdmin)(startDate, endDate, bookingRepository);
            res.status(httpStatus_1.HttpStatus.OK).json({
                success: true,
                message: "Reports generated successfully",
                report,
            });
        }
        catch (error) {
            next(error);
        }
    });
    /*
     * METHOD:GET
     * Get Banners
     */
    const getBanners = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const banners = yield (0, banner_usecase_1.getAllBanners)({}, adminRepository);
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
    /*
     * METHOD:POST
     * Add new banner
     */
    const addNewBanner = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const newBanner = yield (0, banner_usecase_1.addBanner)(req.body, adminRepository);
            res.status(httpStatus_1.HttpStatus.OK).json({
                success: true,
                message: "Banner Added successfully",
                newBanner,
            });
        }
        catch (error) {
            next(error);
        }
    });
    /*
     * METHOD:PATCH
     * updateBanner
     */
    const updateBanner = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { isActive } = req.query;
            const { bannerId } = req.params;
            const updatedBanner = yield (0, banner_usecase_1.updateActiveBanners)(bannerId, isActive, adminRepository);
            res.status(httpStatus_1.HttpStatus.OK).json({
                success: true,
                message: "Banner updated successfully",
                updatedBanner,
            });
        }
        catch (error) {
            next(error);
        }
    });
    /*
     * METHOD:DELETE
     * Remove banner
     */
    const removBanner = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { bannerId } = req.params;
            yield (0, banner_usecase_1.removBannerImage)(bannerId, adminRepository);
            res.status(httpStatus_1.HttpStatus.OK).json({
                success: true,
                message: "Banner deleted successfully",
            });
        }
        catch (error) {
            next(error);
        }
    });
    return {
        adminLogin,
        getAllUser,
        getAllRestaurants,
        userBlock,
        validateRestaurant,
        listRestaurant,
        dashboardDetails,
        generateReport,
        getBanners,
        addNewBanner,
        updateBanner,
        removBanner,
    };
};
