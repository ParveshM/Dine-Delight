export default function reserveSlotEntity(
  tableId: string,
  slotDate: Date,
  startTime: string,
  endTime: string
) {
  return {
    getTableId: (): string => tableId,
    getslotDate: (): Date => slotDate,
    getStartTime: (): string => startTime,
    getEndTime: (): string => endTime,
  };
}
export type ReserveSlotEntityType = ReturnType<typeof reserveSlotEntity>;
