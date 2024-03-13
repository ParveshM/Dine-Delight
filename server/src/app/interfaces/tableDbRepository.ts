import { TableEntityType } from "../../entities/tableEntity";
import { TableRepositoryMongodbType } from "../../frameworks/database/mongodb/repositories/tableRepositoryMongoDb";

export const tableDbRepository = (
  repository: ReturnType<TableRepositoryMongodbType>
) => {
  const addTable = async (tableData: TableEntityType) =>
    await repository.addTable(tableData);

  const getTablebyId = async (tableId: string) =>
    await repository.getTablebyId(tableId);

  const getTablebyNumber = async (tableNumber: string, restaurantId: string) =>
    await repository.getTablebyNumber(tableNumber, restaurantId);

  return { addTable, getTablebyId, getTablebyNumber };
};
export type TableDbInterface = typeof tableDbRepository;
