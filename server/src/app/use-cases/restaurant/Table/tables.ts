import tableEntity from "../../../../entities/tableEntity";
import { HttpStatus } from "../../../../types/httpStatus";
import { NewTableInterface } from "../../../../types/tableInterface";
import CustomError from "../../../../utils/customError";
import { TableDbInterface } from "../../../interfaces/tableDbRepository";

export const addNewTable = async (
  tableData: NewTableInterface,
  restaurantId: string,
  tableDbRepository: ReturnType<TableDbInterface>
) => {
  const { tableNumber, capacity, location } = tableData;

  const isTableExist = await tableDbRepository.getTablebyNumber(
    tableNumber,
    restaurantId
  );
  if (isTableExist)
    throw new CustomError(
      "Table name already exists,please use another name",
      HttpStatus.BAD_REQUEST
    );

  const createNewTable = tableEntity(
    tableNumber,
    restaurantId,
    capacity,
    location
  );
  await tableDbRepository.addTable(createNewTable);
};
