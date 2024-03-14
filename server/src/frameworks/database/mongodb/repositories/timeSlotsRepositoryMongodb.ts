import { TimeSlotEntityType } from "../../../../entities/timeSlotEntity";
import TimeSlot from "../models/timeSlots";

export const timeSlotRepositoryMongodb = () => {
  const addTimeSlots = async (timeSlotData: TimeSlotEntityType) =>
    await TimeSlot.create({
      restaurantId: timeSlotData.getRestaurantId(),
      startTime: timeSlotData.getStartTime(),
      endTime: timeSlotData.getEndTime(),
    });

  const getSlotByTime = async (
    restaurantId: string,
    startTime: string,
    endTime: string
  ) => await TimeSlot.findOne({ restaurantId, startTime, endTime });

  const getAllTimeSlots = async (restaurantId: string) =>
    await TimeSlot.find({ restaurantId }).sort({ startTime: 1 });

  const removeTimeSlotbyId = async (id: string) =>
    await TimeSlot.findByIdAndDelete(id);

  return {
    addTimeSlots,
    getAllTimeSlots,
    getSlotByTime,
    removeTimeSlotbyId,
  };
};

export type TimeSlotRepositoryMongodbType = typeof timeSlotRepositoryMongodb;
