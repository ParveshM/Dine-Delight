import { slotEntityType } from "../../../../entities/slotEntity";
import ReserveTable from "../models/reserveTableslots";

export const reserveTableSlotRepositoryMongodb = () => {
  const addSlot = async (slotData: slotEntityType) =>
    await ReserveTable.create({
      tableId: slotData.getTableId(),
      slot: slotData.getslot(),
      isAvailable: slotData.getAvailbility(),
    });

  const getReservedTablebyId = async (tableId: string) =>
    await ReserveTable.findById(tableId);

  return {
    addSlot,
    getReservedTablebyId,
  };
};

export type reserveTableSlotRepositoryMongodbType =
  typeof reserveTableSlotRepositoryMongodb;
