import { ReserveSlotEntityType } from "../../../../entities/reserveSlotEntity";
import TableSlot from "../models/Tableslots";

export const TableSlotRepositoryMongodb = () => {
  const addNewTableSlot = async (slotData: ReserveSlotEntityType) => {
    await TableSlot.create({
      tableId: slotData.getTableId(),
      slotDate: slotData.getslotDate(),
      startTime: slotData.getStartTime(),
      endTime: slotData.getEndTime(),
    });
  };

  const getReservedTablebyId = async (tableId: string) =>
    await TableSlot.findById(tableId);

  const isSlotAvailable = async (
    tableId: string,
    slotDate: Date,
    startTime: string,
    endTime: string
  ) => await TableSlot.findOne({ tableId, slotDate, startTime, endTime });

  return {
    addNewTableSlot,
    getReservedTablebyId,
    isSlotAvailable,
  };
};

export type TableSlotRepositoryMongodbType = typeof TableSlotRepositoryMongodb;
