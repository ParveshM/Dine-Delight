import express from "express";
import restaurantController from "../../../adapters/restaurantController";
import { authServiceInterface } from "../../../app/services-Interface/authServiceInterface";
import { authService } from "../../services/authService";
import { restaurantDbRepository } from "../../../app/interfaces/restaurantDbRepository";
import { restaurantRepositoryMongodb } from "../../database/mongodb/repositories/restaurantRepositoryMongodb";
import { authenticateSeller } from "../middlewares/authMiddleware";
import tableController from "../../../adapters/tableController";
import { tableRepositoryMongodb } from "../../database/mongodb/repositories/tableRepositoryMongoDb";
import { tableDbRepository } from "../../../app/interfaces/tableDbRepository";
import { TableSlotDbRepository } from "../../../app/interfaces/TableSlotdbRepository";
import { TableSlotRepositoryMongodb } from "../../database/mongodb/repositories/TableSlotRepositoryMongodb";
import { timeSlotDbRepository } from "../../../app/interfaces/timeSlotDbRepository";
import { timeSlotRepositoryMongodb } from "../../database/mongodb/repositories/timeSlotsRepositoryMongodb";
import { bookingDbRepository } from "../../../app/interfaces/bookingDbRepository";
import { bookingRepositoryMongodb } from "../../database/mongodb/repositories/BookingRepositoryMongodb";
import { userDbRepository } from "../../../app/interfaces/userDbRepository";
import { userRepositoryMongodb } from "../../database/mongodb/repositories/userRepositoryMongodb";
import menuController from "../../../adapters/menuController";
import { MenuRepositoryMongodb } from "../../database/mongodb/repositories/MenuRepositoryMongodb";
import { menuDbRepository } from "../../../app/interfaces/menuDbRepository";
import OrderDbRepository from "../../../app/interfaces/OrderDbRepository";
import OrderRepositoryMongodb from "../../database/mongodb/repositories/OrderRepositoryMongodb";

const restaurantRoute = () => {
  const router = express.Router();

  // Restaurant controller
  const controller = restaurantController(
    authServiceInterface,
    authService,
    restaurantDbRepository,
    restaurantRepositoryMongodb,
    bookingDbRepository,
    bookingRepositoryMongodb,
    userDbRepository,
    userRepositoryMongodb,
    OrderDbRepository,
    OrderRepositoryMongodb
  );
  // Table management and controller
  const _tableController = tableController(
    tableDbRepository,
    tableRepositoryMongodb,
    TableSlotDbRepository,
    TableSlotRepositoryMongodb,
    timeSlotDbRepository,
    timeSlotRepositoryMongodb
  );

  const _menuController = menuController(
    menuDbRepository,
    MenuRepositoryMongodb,
    bookingDbRepository,
    bookingRepositoryMongodb,
    userDbRepository,
    userRepositoryMongodb
  );

  router.post("/signup", controller.signup);
  router.post("/verify_token/:token", controller.verifyToken);
  router.post("/login", controller.login);
  router.get("/info", authenticateSeller, controller.get_restaurantDetails);
  router.get("/reports", authenticateSeller, controller.generateReports);
  router.get("/dashboard", authenticateSeller, controller.restaurantDashboard);
  router.put("/info", authenticateSeller, controller.updateRestaurantDetails);

  /************* Reservations *************** */
  router.get("/bookings", authenticateSeller, controller.reservations);
  router.get(
    "/bookings/:bookingID",
    authenticateSeller,
    controller.getReservationbybookingId
  );
  router.patch(
    "/booking/edit/:bookingID",
    authenticateSeller,
    controller.updateReservations
  );

  /******** Table routes ********/
  router.post("/table/new", authenticateSeller, _tableController.addTable);
  router.post(
    "/table_slots/allot",
    authenticateSeller,
    _tableController.allotTableSlots
  );

  router.delete(
    "/table_slots/:tableID",
    authenticateSeller,
    _tableController.deleteTableSlot
  );

  router.get("/tables", authenticateSeller, _tableController.getAllTable);
  router.get(
    "/table_slots/:tableID",
    authenticateSeller,
    _tableController.getAllTableSlots
  );

  /**** Time slot routes ****/
  router.get("/time_slots", authenticateSeller, _tableController.getTimeSlots);
  router.post(
    "/time_slots/new",
    authenticateSeller,
    _tableController.addTimeSlots //create new time slot
  );
  router.delete("/time_slots/:timeSlotId", _tableController.removeTimeSlot);

  /******** Menu routes **********/
  router.get("/menu", authenticateSeller, _menuController.getMenu);
  router.post("/menu/add", authenticateSeller, _menuController.addMenuItem);
  router.put(
    "/menu/edit/:menuItemID",
    authenticateSeller,
    _menuController.editMenuItem
  );
  router.delete(
    "/menu/delete/:menuItemID",
    authenticateSeller,
    _menuController.deleteMenuItem
  );

  /*********** Orders  ************/
  router.get("/orders", authenticateSeller, controller.getOrders);
  router.patch("/orders/:orderId", authenticateSeller, controller.updateOrder);

  return router;
};
export default restaurantRoute;
