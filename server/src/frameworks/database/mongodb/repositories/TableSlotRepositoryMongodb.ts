import { ReserveSlotEntityType } from "../../../../entities/reserveSlotEntity";
import TableSlot from "../models/Tableslots";

export const TableSlotRepositoryMongodb = () => {
  const addNewTableSlot = async (slotData: ReserveSlotEntityType) =>
    await TableSlot.create({
      tableId: slotData.getTableId(),
      slotDate: slotData.getslotDate(),
      startTime: slotData.getStartTime(),
      endTime: slotData.getEndTime(),
    });

  const getTableSlotbyId = async (tableId: string) =>
    await TableSlot.find({ tableId });

  const isSlotAvailable = async (
    tableId: string,
    slotDate: Date,
    startTime: string,
    endTime: string
  ) => await TableSlot.findOne({ tableId, slotDate, startTime, endTime });

  return {
    addNewTableSlot,
    getTableSlotbyId,
    isSlotAvailable,
  };
};

export type TableSlotRepositoryMongodbType = typeof TableSlotRepositoryMongodb;
