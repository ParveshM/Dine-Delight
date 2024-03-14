import { Request, Response, NextFunction } from "express";
import { TableDbInterface } from "../app/interfaces/tableDbRepository";
import { TableRepositoryMongodbType } from "../frameworks/database/mongodb/repositories/tableRepositoryMongoDb";
import { addNewTable } from "../app/use-cases/restaurant/Table/tables";
import { HttpStatus } from "../types/httpStatus";
import { TableSlotDbInterface } from "../app/interfaces/reserveTabledbRepository";
import { TableSlotRepositoryMongodbType } from "../frameworks/database/mongodb/repositories/TableSlotRepositoryMongodb";
import { addTableslotAndTime } from "../app/use-cases/restaurant/Table/reserveTableSlot";
import { TimeSlotDbInterface } from "../app/interfaces/timeSlotDbRepository";
import { TimeSlotRepositoryMongodbType } from "../frameworks/database/mongodb/repositories/timeSlotsRepositoryMongodb";
import {
  addTimeSlot,
  deleteTimeSlot,
  getTimeSlotsByRestaurantId,
} from "../app/use-cases/restaurant/Table/timeSlot";

const tableController = (
  tableDbRepository: TableDbInterface,
  tableDbRepositoryImpl: TableRepositoryMongodbType,
  reserveTableDbRepository: TableSlotDbInterface,
  reserveTableDbRepositoryImpl: TableSlotRepositoryMongodbType,
  timeSlotDbRepository: TimeSlotDbInterface,
  timeSlotDbRepositoryImpl: TimeSlotRepositoryMongodbType
) => {
  const dbTableRepository = tableDbRepository(tableDbRepositoryImpl());
  const dbReserveTableRepository = reserveTableDbRepository(
    reserveTableDbRepositoryImpl()
  );
  const dbTimeSlotRepository = timeSlotDbRepository(timeSlotDbRepositoryImpl());

  /*
   * * METHOD :POST
   * Add new table to database
   */

  const addTable = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const restaurantId = req.seller;
      await addNewTable(req.body, restaurantId, dbTableRepository);
      return res
        .status(HttpStatus.OK)
        .json({ success: true, message: "Table created successfully" });
    } catch (error) {
      next(error);
    }
  };

  /*
   * * METHOD :POST
   * Allot slots for tables
   */

  const allotTableSlots = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await addTableslotAndTime(req.body, dbReserveTableRepository);
      return res.status(HttpStatus.OK).json({
        success: true,
        message: "Time slot addedd successfully",
      });
    } catch (error) {
      next(error);
    }
  };
  /*
   * * METHOD :POST
   * Add new time slots
   */
  const addTimeSlots = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const newTimeSlot = await addTimeSlot(
        req.body,
        req.seller,
        dbTimeSlotRepository
      );
      res.status(HttpStatus.OK).json({
        success: true,
        message: "Time slots added successfully",
        newTimeSlot,
      });
    } catch (error) {
      next(error);
    }
  };
  /*
   * * METHOD :GET
   * return all time slot to the restaurant
   */
  const getTimeSlots = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const restaurantId = req.seller;
      const timeSlots = await getTimeSlotsByRestaurantId(
        restaurantId,
        dbTimeSlotRepository
      );
      res.status(HttpStatus.OK).json({ success: true, timeSlots });
    } catch (error) {
      next(error);
    }
  };

  /*
   * * METHOD :DELETE
   * Remove time slot from database
   */

  const removeTimeSlot = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { timeSlotId } = req.params;
      console.log(timeSlotId);
      await deleteTimeSlot(timeSlotId, dbTimeSlotRepository);
      res
        .status(HttpStatus.OK)
        .json({ success: true, message: "Slot deleted successfully" });
    } catch (error) {
      next(error);
    }
  };

  return {
    addTable,
    allotTableSlots,
    addTimeSlots,
    getTimeSlots,
    removeTimeSlot,
  };
};

export default tableController;
