import TimeSlotEntity from "../../../../entities/timeSlotEntity";
import { HttpStatus } from "../../../../types/httpStatus";
import { TimeSlotDataInterface } from "../../../../types/tableInterface";
import CustomError from "../../../../utils/customError";
import { TimeSlotDbInterface } from "../../../interfaces/timeSlotDbRepository";

export const addTimeSlot = async (
  timeSlotData: TimeSlotDataInterface,
  restaurantId: string,
  dbTimeSlotRepository: ReturnType<TimeSlotDbInterface>
) => {
  const { startTime, endTime } = timeSlotData;
  const isTimeSlotExists = await dbTimeSlotRepository.isTimeSlotExist(
    restaurantId,
    startTime,
    endTime
  );

  if (isTimeSlotExists)
    throw new CustomError("Time slot already exists ", HttpStatus.BAD_REQUEST);

  const newSlot = TimeSlotEntity(restaurantId, startTime, endTime);
  return await dbTimeSlotRepository.addTimeSlot(newSlot);
};

export const getTimeSlotsByRestaurantId = async (
  restaurantId: string,
  dbTimeSlotRepository: ReturnType<TimeSlotDbInterface>
) => await dbTimeSlotRepository.getAllTimeSlots(restaurantId);

export const deleteTimeSlot = async (
  timeSlotId: string,
  dbTimeSlotRepository: ReturnType<TimeSlotDbInterface>
) => await dbTimeSlotRepository.removeTimeSlotbyId(timeSlotId);
