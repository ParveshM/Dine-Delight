import { ReserveSlotEntityType } from "../../entities/reserveSlotEntity";
import { TableSlotRepositoryMongodbType } from "../../frameworks/database/mongodb/repositories/TableSlotRepositoryMongodb";
import { allotTableSlotInterface } from "../../types/tableInterface";

export const TableSlotDbRepository = (
  repository: ReturnType<TableSlotRepositoryMongodbType>
) => {
  const addNewTableSlot = async (reserveTableData: ReserveSlotEntityType) =>
    await repository.addNewTableSlot(reserveTableData);

  const getTablSlotebyId = async (tableId: string) =>
    await repository.getTableSlotbyId(tableId);

  const isSlotAvailable = async ({
    tableId,
    slotDate,
    startTime,
    endTime,
  }: allotTableSlotInterface) =>
    await repository.isSlotAvailable(tableId, slotDate, startTime, endTime);

  const removeTablSlotebyId = async (tableID: string) =>
    await repository.removeTableSlotById(tableID);

  const getAvailableTableSlotsByFilter = async (
    restaurantID: string,
    capacity: number,
    startTime: string,
    currentDate: Date
  ) =>
    await repository.getAvailableTableSlotsByFilter(
      restaurantID,
      capacity,
      startTime,
      currentDate
    );

  return {
    addNewTableSlot,
    getTablSlotebyId,
    isSlotAvailable,
    removeTablSlotebyId,
    getAvailableTableSlotsByFilter,
  };
};

export type TableSlotDbInterface = typeof TableSlotDbRepository;
