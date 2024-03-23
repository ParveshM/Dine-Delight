export interface BookingInterface {
  _id: string;
  bookingId: string;
  restaurantId: {
    restaurantName: string;
    tableRatePerPerson: number;
    secondaryImages: string[];
    verificationToken: string;
    createdAt: Date;
    updatedAt: Date;
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
  bookingStatus:
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
