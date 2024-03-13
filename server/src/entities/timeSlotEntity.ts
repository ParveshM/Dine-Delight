export default function TimeSlotEntity(
  restaurantId: string,
  startTime: string,
  endTime: string
) {
  return {
    getRestaurantId: (): string => restaurantId,
    getStartTime: (): string => startTime,
    getEndTime: (): string => endTime,
  };
}
export type TimeSlotEntityType = ReturnType<typeof TimeSlotEntity>;
