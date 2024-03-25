export interface BookingInterface {
  _id: string;
  bookingId: string;
  restaurantId: {
    _id: string;
    restaurantName: string;
    tableRatePerPerson: number;
    primaryImage: string;
    createdAt: Date;
  };
  userId: {
    _id: string;
    name: string;
    email: string;
  };
  tableId: {
    tableNumber: string;
    capacity: number;
    location: "In" | "Out";
  };
  tableSlotId: {
    slotDate: Date;
    startTime: string;
    endTime: string;
  };
  paymentMethod: "Online" | "Wallet";
  paymentStatus: "Pending" | "Paid" | "Failed";
  bookingStatus?:
    | "Pending"
    | "Confirmed"
    | "Cancelled"
    | "Checked-in"
    | "No-show"
    | "Completed";
  gstAmount: number;
  totalAmount: number;
  createdAt: Date;
}
