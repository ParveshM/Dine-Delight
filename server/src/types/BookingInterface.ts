export interface createReservationInterface {
  restaurantId: string;
  tableId: string;
  tableSlotId: string;
  paymentMethod: "Online" | "Wallet";
  gstAmount: number;
  totalAmount: number;
}
