import { ReserveSlotEntityType } from "../../entities/reserveSlotEntity";
import { TableSlotRepositoryMongodbType } from "../../frameworks/database/mongodb/repositories/TableSlotRepositoryMongodb";
import { allotTableSlotInterface } from "../../types/tableInterface";

export const TableSlotDbRepository = (
  repository: ReturnType<TableSlotRepositoryMongodbType>
) => {
  const addNewTableSlot = async (reserveTableData: ReserveSlotEntityType) =>
    await repository.addNewTableSlot(reserveTableData);

  const getReservedTablebyId = async (tableId: string) =>
    await repository.getReservedTablebyId(tableId);

  const isSlotAvailable = async ({
    tableId,
    slotDate,
    startTime,
    endTime,
  }: allotTableSlotInterface) =>
    await repository.isSlotAvailable(tableId, slotDate, startTime, endTime);

  return {
    addNewTableSlot,
    getReservedTablebyId,
    isSlotAvailable,
  };
};

export type TableSlotDbInterface = typeof TableSlotDbRepository;
