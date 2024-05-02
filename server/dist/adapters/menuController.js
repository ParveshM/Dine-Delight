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
const httpStatus_1 = require("../types/httpStatus");
const create_1 = require("../app/use-cases/restaurant/menu/create");
const update_delete_1 = require("../app/use-cases/restaurant/menu/update&delete");
const read_1 = require("../app/use-cases/restaurant/menu/read");
const sendEmailNewsletter_1 = require("../app/use-cases/restaurant/menu/sendEmailNewsletter");
const menuController = (menuDbRepository, menuDbRepositoryImpl, bookingDbRepository, bookingDbRepositoryImpl, userDbRepository, userDbRepositoryImpl) => {
    const menuRepository = menuDbRepository(menuDbRepositoryImpl());
    const userRepository = userDbRepository(userDbRepositoryImpl());
    const bookingRepository = bookingDbRepository(bookingDbRepositoryImpl());
    /*
     * METHOD:POST
     * Add menuitem to the Db
     */
    const addMenuItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const restaurantId = req.seller;
            const menuItem = yield (0, create_1.addItemToMenu)(restaurantId, req.body, menuRepository);
            const { notifyUsers } = req.body;
            if (notifyUsers) {
                (0, sendEmailNewsletter_1.sendEmailNewsLetter)(restaurantId, userRepository, bookingRepository, req.body);
            }
            res
                .status(httpStatus_1.HttpStatus.OK)
                .json({ success: true, menuItem, message: "Item added successfully" });
        }
        catch (error) {
            next(error);
        }
    });
    /*
     * METHOD: PUT
     * Update menu item in the Db
     */
    const editMenuItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { menuItemID } = req.params;
            const restaurantId = req.seller;
            const { notifyUsers } = req.body;
            const updatedMenuItem = yield (0, update_delete_1.updateMenuItem)(menuItemID, req.body, menuRepository);
            if (notifyUsers) {
                (0, sendEmailNewsletter_1.sendEmailNewsLetter)(restaurantId, userRepository, bookingRepository, req.body);
            }
            res.status(httpStatus_1.HttpStatus.OK).json({
                success: true,
                menuItem: updatedMenuItem,
                message: "Item updated successfully",
            });
        }
        catch (error) {
            next(error);
        }
    });
    /*
     * METHOD: DELETE
     * Delete menu item from the Db
     */
    const deleteMenuItem = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const { menuItemID } = req.params;
            yield (0, update_delete_1.removeMenuItem)(menuItemID, menuRepository);
            res
                .status(httpStatus_1.HttpStatus.OK)
                .json({ success: true, message: "Item deleted successfully" });
        }
        catch (error) {
            next(error);
        }
    });
    /*
     * METHOD: GET
     * Get  menu for the restaurant
     */
    const getMenu = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            let restaurantId = req.seller || req.query.restaurantId;
            const page = parseInt(req.query.page, 10) || 1;
            const q = req.query.q;
            const isVegetarian = req.query.isVegetarian;
            const category = req.query.category;
            const bookingId = req.query.bookingId;
            if (bookingId) {
                const booking = yield (bookingRepository === null || bookingRepository === void 0 ? void 0 : bookingRepository.getBookingById(bookingId));
                restaurantId = booking === null || booking === void 0 ? void 0 : booking.restaurantId;
            }
            const filters = {
                restaurantId,
            };
            if (q)
                filters.name = new RegExp(q !== null && q !== void 0 ? q : "", "i");
            if (isVegetarian)
                filters.isVegetarian = isVegetarian;
            if (category)
                filters.category = category;
            const limit = 10;
            const skip = (page - 1) * limit;
            const menu = yield (0, read_1.getMenuByRestaurant)(filters, limit, skip, menuRepository);
            res
                .status(httpStatus_1.HttpStatus.OK)
                .json({ success: true, message: "Menu fetched successfully", menu });
        }
        catch (error) {
            next(error);
        }
    });
    return { getMenu, addMenuItem, editMenuItem, deleteMenuItem };
};
exports.default = menuController;
