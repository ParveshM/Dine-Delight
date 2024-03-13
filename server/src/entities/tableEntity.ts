export default function tableEntity(
  tableNumber: string,
  restaurantId: string,
  capacity: number,
  location: string
) {
  return {
    getTableNumber: (): string => tableNumber,
    getRestaurantId: (): string => restaurantId,
    getCapacity: (): number => capacity,
    getLocation: (): string => location,
  };
}
export type TableEntityType = ReturnType<typeof tableEntity>;
