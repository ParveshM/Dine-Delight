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
import { addTimeSlot } from "../app/use-cases/restaurant/Table/timeSlot";

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

  const allotTableSlots = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await addTableslotAndTime(req.body, dbReserveTableRepository);
      return res
        .status(HttpStatus.OK)
        .json({ success: true, message: "Time slot addedd successfully" });
    } catch (error) {
      next(error);
    }
  };

  const addTimeSlots = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      await addTimeSlot(req.body, req.seller, dbTimeSlotRepository);
      res
        .status(HttpStatus.OK)
        .json({ success: true, message: "Time slots added successfully" });
    } catch (error) {
      next(error);
    }
  };

  return { addTable, allotTableSlots, addTimeSlots };
};

export default tableController;
