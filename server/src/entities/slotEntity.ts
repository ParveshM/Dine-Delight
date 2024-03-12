export default function slotEntity(
  tableId: string,
  slot: Date,
  isAvailable: boolean
) {
  return {
    getTableId: (): string => tableId,
    getslot: (): Date => slot,
    getAvailbility: (): boolean => isAvailable,
  };
}
export type slotEntityType = ReturnType<typeof slotEntity>;
