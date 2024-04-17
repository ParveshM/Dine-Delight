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
  removeTableSlot,
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
      const newSlot = await addTableslotAndTime(
        req.body,
        dbTableSlotsRepository
      );
      if (newSlot) {
        return res.status(HttpStatus.OK).json({
          success: true,
          message: "Time slot addedd successfully",
          newSlot,
        });
      }
    } catch (error) {
      next(error);
    }
  };

  /*
   * * METHOD :DELETE
   * Delete Table slot by id
   */
  const deleteTableSlot = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { tableID } = req.params;

      await removeTableSlot(tableID, dbTableSlotsRepository);
      return res.status(HttpStatus.OK).json({
        success: true,
        message: "slot removed successfully",
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
        const page = parseInt(req.query.page as string) ?? 1;
        const limit = 5;
        const skip = (page - 1) * limit;

        const { tables, count } = await getTableList(
          restaurantID,
          skip,
          limit,
          dbTableRepository
        );
        res.status(HttpStatus.OK).json({
          success: true,
          tables,
          count,
          skip,
          limit,
          message: "Tables fetched successfully",
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

  const getAllTableSlots = asyncHandler(async (req: Request, res: Response) => {
    try {
      const { tableID } = req.params;
      const page = parseInt(req.query.page as string) ?? 1;
      const { date, time } = req.query as { date: string; time: string };
      const limit = 2;
      const skip = (page - 1) * limit;

      const filterQuery: Record<string, any> = {};
      if (date) filterQuery.slotDate = date;
      if (time) filterQuery.startTime = time;
      const paginate = { skip, limit };

      const { tableSlot, count } = await getTableSlots(
        tableID,
        filterQuery,
        paginate,
        dbTableSlotsRepository
      );
      res.status(HttpStatus.OK).json({
        success: true,
        message: "TableSlots fetched successfully",
        tableSlot,
        count,
        limit,
      });
    } catch (error) {
      throw new Error("Error in fetching table");
    }
  });

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
    deleteTableSlot,
  };
};

export default tableController;
