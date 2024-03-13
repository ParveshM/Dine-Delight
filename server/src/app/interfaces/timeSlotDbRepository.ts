import { TimeSlotRepositoryMongodbType } from "../../frameworks/database/mongodb/repositories/timeSlotsRepositoryMongodb";
import { TimeSlotEntityType } from "../../entities/timeSlotEntity";

export const timeSlotDbRepository = (
  repository: ReturnType<TimeSlotRepositoryMongodbType>
) => {
  const addTimeSlot = async (timeslotData: TimeSlotEntityType) =>
    await repository.addTimeSlots(timeslotData);

  const isTimeSlotExist = async (
    restaurantId: string,
    startTime: string,
    endTime: string
  ) => await repository.getSlotByTime(restaurantId, startTime, endTime);

  const getAllTimeSlots = async (restaurantId: string) =>
    await repository.getAllTimeSlots(restaurantId);

  return {
    addTimeSlot,
    isTimeSlotExist,
    getAllTimeSlots,
  };
};
export type TimeSlotDbInterface = typeof timeSlotDbRepository;
