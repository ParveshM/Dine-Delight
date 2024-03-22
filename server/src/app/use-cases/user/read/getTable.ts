import { TableDbInterface } from "../../../interfaces/tableDbRepository";

export const getTableDetails = async (
  tableID: string,
  tableRepository: ReturnType<TableDbInterface>
) => await tableRepository.getTablebyId(tableID);
