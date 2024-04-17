import { TableEntityType } from "../../entities/tableEntity";
import { TableRepositoryMongodbType } from "../../frameworks/database/mongodb/repositories/tableRepositoryMongoDb";
import { PaginateInterface } from "../../types/restaurantInterface";

export const tableDbRepository = (
  repository: ReturnType<TableRepositoryMongodbType>
) => {
  const addTable = async (tableData: TableEntityType) =>
    await repository.addTable(tableData);

  const getTablebyId = async (tableId: string) =>
    await repository.getTablebyId(tableId);

  const getTablebyNumber = async (tableNumber: string, restaurantId: string) =>
    await repository.getTablebyNumber(tableNumber, restaurantId);

  const getAllTables = async (
    filter: Record<string, any>,
    paginate: PaginateInterface
  ) => await repository.getAllTables(filter, paginate);

  return { addTable, getTablebyId, getTablebyNumber, getAllTables };
};
export type TableDbInterface = typeof tableDbRepository;
