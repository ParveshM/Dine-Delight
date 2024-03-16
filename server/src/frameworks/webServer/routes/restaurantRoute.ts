import express, { Request, Response } from "express";
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

const restaurantRoute = () => {
  const router = express.Router();

  // Restaurant controller
  const controller = restaurantController(
    authServiceInterface,
    authService,
    restaurantDbRepository,
    restaurantRepositoryMongodb
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

  router.post("/signup", controller.signup);
  router.post("/verify_token/:token", controller.verifyToken);
  router.post("/login", controller.login);
  router.get(
    "/get_details",
    authenticateSeller,
    controller.get_restaurantDetails
  );
  router.put(
    "/update_details",
    authenticateSeller,
    controller.updateRestaurantDetails
  );

  /**** Table routes ******/
  router.post("/add_table", authenticateSeller, _tableController.addTable);
  router.post(
    "/allot_tableSlot",
    authenticateSeller,
    _tableController.allotTableSlots
  );

  router.delete(
    "/delete_tableSlot/:tableID",
    authenticateSeller,
    _tableController.deleteTableSlot
  );

  router.get(
    "/get_allTables",
    authenticateSeller,
    _tableController.getAllTable
  );
  router.get(
    "/get_allTableSlots/:tableID",
    authenticateSeller,
    _tableController.getAllTableSlots
  );

  /**** Time slot routes ****/
  router.post(
    "/add_timeslot",
    authenticateSeller,
    _tableController.addTimeSlots
  );
  router.get(
    "/get_timeSlots",
    authenticateSeller,
    _tableController.getTimeSlots
  );
  router.delete(
    "/delete_timeSlot/:timeSlotId",
    _tableController.removeTimeSlot
  );
  /*********************************/

  return router;
};
export default restaurantRoute;
