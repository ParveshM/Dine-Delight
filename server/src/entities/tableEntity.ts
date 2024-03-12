export default function tableEntity(
  tableNumber: number,
  restaurantId: string,
  capacity: number,
  location: string
) {
  return {
    getTableNumber: (): number => tableNumber,
    getRestaurantId: (): string => restaurantId,
    getCapacity: (): number => capacity,
    getLocation: (): string => location,
  };
}
export type TableEntityType = ReturnType<typeof tableEntity>;
