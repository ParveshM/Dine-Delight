import { ReserveSlotEntityType } from "../../../../entities/reserveSlotEntity";
import TableSlot from "../models/Tableslots";
import mongoose from "mongoose";

export const TableSlotRepositoryMongodb = () => {
  const addNewTableSlot = async (slotData: ReserveSlotEntityType) =>
    await TableSlot.create({
      tableId: slotData.getTableId(),
      slotDate: slotData.getslotDate(),
      startTime: slotData.getStartTime(),
      endTime: slotData.getEndTime(),
    });

  const getTableSlotbyId = async (tableId: string) =>
    await TableSlot.find({ tableId }).sort({ slotDate: 1 });

  const isSlotAvailable = async (
    tableId: string,
    slotDate: Date,
    startTime: string,
    endTime: string
  ) => await TableSlot.findOne({ tableId, slotDate, startTime, endTime });

  const updateSlot = async (id: string, updatingData: Record<string, any>) =>
    await TableSlot.findByIdAndUpdate(id, updatingData);

  const removeTableSlotById = async (tableId: string) =>
    await TableSlot.findByIdAndDelete(tableId);

  const getAvailableTableSlotsByFilter = async (
    restaurantID: string,
    capacity: number,
    startTime: string | "$startTime", //type '$startTime' that is matched by whole dataset startTime else the given time
    currentDate: string
  ) => {
    const startOfDay = new Date(currentDate);
    startOfDay.setHours(0, 0, 0);
    const endOfDay = new Date(currentDate);
    endOfDay.setHours(23, 59, 59);
    const objectIdRestaurantID = new mongoose.Types.ObjectId(restaurantID);

    return await TableSlot.aggregate([
      {
        $lookup: {
          from: "tables",
          localField: "tableId",
          foreignField: "_id",
          as: "tableInfo",
        },
      },
      {
        $match: {
          "tableInfo.restaurantId": objectIdRestaurantID,
          "tableInfo.capacity": capacity,
          isAvailable: true,
          slotDate: {
            $gte: startOfDay,
            $lt: endOfDay,
          },
        },
      },
      {
        $project: {
          startTime: { $trim: { input: startTime } },
          tableId: 1,
          slotDate: 1,
          endTime: 1,
          isAvailable: 1,
        },
      },
      {
        $group: {
          _id: "$startTime",
          slot: { $first: "$$ROOT" },
          originalId: { $first: "$_id" },
        },
      },
      {
        $sort: {
          _id: -1,
        },
      },
      {
        $project: {
          startTime: "$_id",
          tableId: "$slot.tableId",
          slotDate: "$slot.slotDate",
          endTime: "$slot.endTime",
          isAvailable: "$slot.isAvailable",
          tableInfo: "$slot.tableInfo",
          _id: "$originalId",
        },
      },
    ]);
  };

  return {
    addNewTableSlot,
    getTableSlotbyId,
    isSlotAvailable,
    updateSlot,
    removeTableSlotById,
    getAvailableTableSlotsByFilter,
  };
};

export type TableSlotRepositoryMongodbType = typeof TableSlotRepositoryMongodb;
