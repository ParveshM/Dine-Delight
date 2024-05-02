"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const restaurantController_1 = __importDefault(require("../../../adapters/restaurantController"));
const authServiceInterface_1 = require("../../../app/services-Interface/authServiceInterface");
const authService_1 = require("../../services/authService");
const restaurantDbRepository_1 = require("../../../app/interfaces/restaurantDbRepository");
const restaurantRepositoryMongodb_1 = require("../../database/mongodb/repositories/restaurantRepositoryMongodb");
const authMiddleware_1 = require("../middlewares/authMiddleware");
const tableController_1 = __importDefault(require("../../../adapters/tableController"));
const tableRepositoryMongoDb_1 = require("../../database/mongodb/repositories/tableRepositoryMongoDb");
const tableDbRepository_1 = require("../../../app/interfaces/tableDbRepository");
const TableSlotdbRepository_1 = require("../../../app/interfaces/TableSlotdbRepository");
const TableSlotRepositoryMongodb_1 = require("../../database/mongodb/repositories/TableSlotRepositoryMongodb");
const timeSlotDbRepository_1 = require("../../../app/interfaces/timeSlotDbRepository");
const timeSlotsRepositoryMongodb_1 = require("../../database/mongodb/repositories/timeSlotsRepositoryMongodb");
const bookingDbRepository_1 = require("../../../app/interfaces/bookingDbRepository");
const BookingRepositoryMongodb_1 = require("../../database/mongodb/repositories/BookingRepositoryMongodb");
const userDbRepository_1 = require("../../../app/interfaces/userDbRepository");
const userRepositoryMongodb_1 = require("../../database/mongodb/repositories/userRepositoryMongodb");
const menuController_1 = __importDefault(require("../../../adapters/menuController"));
const MenuRepositoryMongodb_1 = require("../../database/mongodb/repositories/MenuRepositoryMongodb");
const menuDbRepository_1 = require("../../../app/interfaces/menuDbRepository");
const OrderDbRepository_1 = __importDefault(require("../../../app/interfaces/OrderDbRepository"));
const OrderRepositoryMongodb_1 = __importDefault(require("../../database/mongodb/repositories/OrderRepositoryMongodb"));
const restaurantRoute = () => {
    const router = express_1.default.Router();
    // Restaurant controller
    const controller = (0, restaurantController_1.default)(authServiceInterface_1.authServiceInterface, authService_1.authService, restaurantDbRepository_1.restaurantDbRepository, restaurantRepositoryMongodb_1.restaurantRepositoryMongodb, bookingDbRepository_1.bookingDbRepository, BookingRepositoryMongodb_1.bookingRepositoryMongodb, userDbRepository_1.userDbRepository, userRepositoryMongodb_1.userRepositoryMongodb, OrderDbRepository_1.default, OrderRepositoryMongodb_1.default);
    // Table management and controller
    const _tableController = (0, tableController_1.default)(tableDbRepository_1.tableDbRepository, tableRepositoryMongoDb_1.tableRepositoryMongodb, TableSlotdbRepository_1.TableSlotDbRepository, TableSlotRepositoryMongodb_1.TableSlotRepositoryMongodb, timeSlotDbRepository_1.timeSlotDbRepository, timeSlotsRepositoryMongodb_1.timeSlotRepositoryMongodb);
    const _menuController = (0, menuController_1.default)(menuDbRepository_1.menuDbRepository, MenuRepositoryMongodb_1.MenuRepositoryMongodb, bookingDbRepository_1.bookingDbRepository, BookingRepositoryMongodb_1.bookingRepositoryMongodb, userDbRepository_1.userDbRepository, userRepositoryMongodb_1.userRepositoryMongodb);
    router.post("/signup", controller.signup);
    router.post("/verify_token/:token", controller.verifyToken);
    router.post("/login", controller.login);
    router.get("/info", authMiddleware_1.authenticateSeller, controller.get_restaurantDetails);
    router.get("/reports", authMiddleware_1.authenticateSeller, controller.generateReports);
    router.get("/dashboard", authMiddleware_1.authenticateSeller, controller.restaurantDashboard);
    router.put("/info", authMiddleware_1.authenticateSeller, controller.updateRestaurantDetails);
    /************* Reservations *************** */
    router.get("/bookings", authMiddleware_1.authenticateSeller, controller.reservations);
    router.get("/bookings/:bookingID", authMiddleware_1.authenticateSeller, controller.getReservationbybookingId);
    router.patch("/booking/edit/:bookingID", authMiddleware_1.authenticateSeller, controller.updateReservations);
    /******** Table routes ********/
    router.post("/table/new", authMiddleware_1.authenticateSeller, _tableController.addTable);
    router.post("/table_slots/allot", authMiddleware_1.authenticateSeller, _tableController.allotTableSlots);
    router.delete("/table_slots/:tableID", authMiddleware_1.authenticateSeller, _tableController.deleteTableSlot);
    router.get("/tables", authMiddleware_1.authenticateSeller, _tableController.getAllTable);
    router.get("/table_slots/:tableID", authMiddleware_1.authenticateSeller, _tableController.getAllTableSlots);
    /**** Time slot routes ****/
    router.get("/time_slots", authMiddleware_1.authenticateSeller, _tableController.getTimeSlots);
    router.post("/time_slots/new", authMiddleware_1.authenticateSeller, _tableController.addTimeSlots //create new time slot
    );
    router.delete("/time_slots/:timeSlotId", _tableController.removeTimeSlot);
    /******** Menu routes **********/
    router.get("/menu", authMiddleware_1.authenticateSeller, _menuController.getMenu);
    router.post("/menu/add", authMiddleware_1.authenticateSeller, _menuController.addMenuItem);
    router.put("/menu/edit/:menuItemID", authMiddleware_1.authenticateSeller, _menuController.editMenuItem);
    router.delete("/menu/delete/:menuItemID", authMiddleware_1.authenticateSeller, _menuController.deleteMenuItem);
    /*********** Orders  ************/
    router.get("/orders", authMiddleware_1.authenticateSeller, controller.getOrders);
    router.patch("/orders/:orderId", authMiddleware_1.authenticateSeller, controller.updateOrder);
    return router;
};
exports.default = restaurantRoute;
