export default function bookingEntity(
  userId: string,
  restaurantId: string,
  tableId: string,
  tableSlotId: string,
  paymentMethod: "Online" | "Wallet",
  gstAmount: number,
  totalAmount: number
) {
  return {
    getUserId: (): string => userId,
    getRestaurantId: (): string => restaurantId,
    getTableId: (): string => tableId,
    getTableSlotId: (): string => tableSlotId,
    getPaymentMethod: (): "Online" | "Wallet" => paymentMethod,
    getGstAmount: (): number => gstAmount,
    getTotalAmount: (): number => totalAmount,
  };
}

export type BookingEntityType = ReturnType<typeof bookingEntity>;
