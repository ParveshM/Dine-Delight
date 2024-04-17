import { TableEntityType } from "../../../../entities/tableEntity";
import Table from "../models/tables";
import { PaginateInterface } from "../../../../types/restaurantInterface";
export const tableRepositoryMongodb = () => {
  const addTable = async (tableData: TableEntityType) =>
    await Table.create({
      tableNumber: tableData.getTableNumber(),
      restaurantId: tableData.getRestaurantId(),
      capacity: tableData.getCapacity(),
      location: tableData.getLocation(),
    });

  const getTablebyId = async (tableId: string) =>
    await Table.findById(tableId).populate("restaurantId");

  const getTablebyNumber = async (tableNumber: string, restaurantId: string) =>
    await Table.findOne({ tableNumber, restaurantId });

  const getAllTables = async (
    filter: Record<string, any>,
    Paginate: PaginateInterface
  ) => {
    const tables = await Table.find(filter)
      .skip(Paginate.skip)
      .limit(Paginate.limit);
    const count = await Table.countDocuments(filter);
    return { tables, count };
  };

  return {
    addTable,
    getTablebyId,
    getAllTables,
    getTablebyNumber,
  };
};

export type TableRepositoryMongodbType = typeof tableRepositoryMongodb;
