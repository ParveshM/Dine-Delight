import { TableEntityType } from "../../../../entities/tableEntity";
import Table from "../models/tables";

export const tableRepositoryMongodb = () => {
  const addTable = async (tableData: TableEntityType) =>
    await Table.create({
      tableNumber: tableData.getTableNumber(),
      restaurantId: tableData.getRestaurantId(),
      capacity: tableData.getCapacity(),
      location: tableData.getLocation(),
    });

  const getTablebyId = async (tableId: string) => await Table.findById(tableId);

  const getAllTables = async (restaurantId: string) =>
    await Table.find({ restaurantId });

  return {
    addTable,
    getTablebyId,
    getAllTables,
  };
};

export type TableRepositoryMongodbType = typeof tableRepositoryMongodb;
