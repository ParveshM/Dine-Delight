import { Request, Response, NextFunction } from "express";
import { TableDbInterface } from "../app/interfaces/tableDbRepository";
import { TableRepositoryMongodbType } from "../frameworks/database/mongodb/repositories/tableRepositoryMongoDb";
import {
  addNewTable,
  getTableList,
} from "../app/use-cases/restaurant/Table/tables";
import { HttpStatus } from "../types/httpStatus";
import { TableSlotDbInterface } from "../app/interfaces/TableSlotdbRepository";
import { TableSlotRepositoryMongodbType } from "../frameworks/database/mongodb/repositories/TableSlotRepositoryMongodb";
import {
  addTableslotAndTime,
  getTableSlots,
} from "../app/use-cases/restaurant/Table/tableSlots";
import { TimeSlotDbInterface } from "../app/interfaces/timeSlotDbRepository";
import { TimeSlotRepositoryMongodbType } from "../frameworks/database/mongodb/repositories/timeSlotsRepositoryMongodb";
import {
  addTimeSlot,
  deleteTimeSlot,
  getTimeSlotsByRestaurantId,
} from "../app/use-cases/restaurant/Table/timeSlot";
import asyncHandler from "express-async-handler";

const tableController = (
  tableDbRepository: TableDbInterface,
  tableDbRepositoryImpl: TableRepositoryMongodbType,
  reserveTableDbRepository: TableSlotDbInterface,
  reserveTableDbRepositoryImpl: TableSlotRepositoryMongodbType,
  timeSlotDbRepository: TimeSlotDbInterface,
  timeSlotDbRepositoryImpl: TimeSlotRepositoryMongodbType
) => {
  const dbTableRepository = tableDbRepository(tableDbRepositoryImpl());
  const dbTableSlotsRepository = reserveTableDbRepository(
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
      const newTable = await addNewTable(
        req.body,
        restaurantId,
        dbTableRepository
      );
      return res.status(HttpStatus.OK).json({
        success: true,
        message: "Table created successfully",
        newTable,
      });
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
      await addTableslotAndTime(req.body, dbTableSlotsRepository);
      return res.status(HttpStatus.OK).json({
        success: true,
        message: "Time slot addedd successfully",
      });
    } catch (error) {
      next(error);
    }
  };

  /*
   * * METHOD :GET
   * Get all the tables for the restaurant
   */
  const getAllTable = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const restaurantID = req.seller;
        const tables = await getTableList(restaurantID, dbTableRepository);
        res.status(HttpStatus.OK).json({
          success: true,
          message: "Tables fetched successfully",
          tables,
        });
      } catch (error) {
        throw new Error("Error in fetching tables");
      }
    }
  );

  /*
   * * METHOD :GET
   * Get all the table Slots by tableID
   * @param tableID
   */

  const getAllTableSlots = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const { tableID } = req.params;
        const tableSlot = await getTableSlots(tableID, dbTableSlotsRepository);
        if (tableSlot)
          res.status(HttpStatus.OK).json({
            success: true,
            message: "TableSlots fetched successfully",
            tableSlot,
          });
        else
          res.status(HttpStatus.FOUND).json({
            success: false,
            message: "Something happened while fetching table slots",
          });
      } catch (error) {
        throw new Error("Error in fetching table");
      }
    }
  );

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
    getAllTable,
    addTimeSlots,
    getTimeSlots,
    removeTimeSlot,
    getAllTableSlots,
  };
};

export default tableController;
