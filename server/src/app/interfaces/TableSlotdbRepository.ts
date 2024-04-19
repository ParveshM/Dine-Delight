import { ReserveSlotEntityType } from "../../entities/reserveSlotEntity";
import { TableSlotRepositoryMongodbType } from "../../frameworks/database/mongodb/repositories/TableSlotRepositoryMongodb";
import { PaginateInterface } from "../../types/restaurantInterface";
import { allotTableSlotInterface } from "../../types/tableInterface";

export const TableSlotDbRepository = (
  repository: ReturnType<TableSlotRepositoryMongodbType>
) => {
  const addNewTableSlot = async (reserveTableData: ReserveSlotEntityType) =>
    await repository.addNewTableSlot(reserveTableData);

  const getTablSlotebyId = async (
    filter: Record<string, any>,
    paginate: PaginateInterface
  ) => await repository.getTableSlotbyId(filter, paginate);

  const isSlotAvailable = async ({
    tableId,
    slotDate,
    startTime,
    endTime,
  }: allotTableSlotInterface) =>
    await repository.isSlotAvailable(tableId, slotDate, startTime, endTime);

  const updateSlot = async (id: string, updateData: Record<string, any>) =>
    await repository.updateSlot(id, updateData);

  const removeTablSlotebyId = async (tableID: string) =>
    await repository.removeTableSlotById(tableID);

  const getAvailableTableSlotsByFilter = async (
    restaurantID: string,
    capacity: number,
    startTime: string,
    currentDate: string,
    endDate?: string
  ) =>
    await repository.getAvailableTableSlotsByFilter(
      restaurantID,
      capacity,
      startTime,
      currentDate,
      endDate
    );

  return {
    addNewTableSlot,
    getTablSlotebyId,
    isSlotAvailable,
    updateSlot,
    removeTablSlotebyId,
    getAvailableTableSlotsByFilter,
  };
};

export type TableSlotDbInterface = typeof TableSlotDbRepository;
