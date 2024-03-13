import reserveSlotEntity from "../../../../entities/reserveSlotEntity";
import { HttpStatus } from "../../../../types/httpStatus";
import { allotTableSlotInterface } from "../../../../types/tableInterface";
import CustomError from "../../../../utils/customError";
import { TableSlotDbInterface } from "../../../interfaces/reserveTabledbRepository";

export const addTableslotAndTime = async (
  reserveTableData: allotTableSlotInterface,
  tableSlotRepository: ReturnType<TableSlotDbInterface>
) => {
  const isSlotExisting = await tableSlotRepository.isSlotAvailable(
    reserveTableData
  );

  if (isSlotExisting)
    throw new CustomError(
      "slot already alotted for this date and time",
      HttpStatus.BAD_REQUEST
    );
  const { tableId, slotDate, startTime, endTime } = reserveTableData;

  const newTablSlot = reserveSlotEntity(tableId, slotDate, startTime, endTime);
  await tableSlotRepository.addNewTableSlot(newTablSlot);
};
