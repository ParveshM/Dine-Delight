import { Types } from "mongoose";

export interface createReservationInterface {
  phone: string;
  restaurantId: string;
  tableId: string;
  tableSlotId: string;
  paymentMethod: "Online" | "Wallet";
  gstAmount: number;
  totalAmount: number;
}

export type TransactionDataType = {
  newBalance: number;
  type: "Debit" | "Credit";
  description: string;
};

export interface BookingInterface {
  _id: Types.ObjectId;
  bookingId: string;
  restaurantId: {
    restaurantName: string;
    tableRatePerPerson: number;
    primaryImage: string;
    createdAt: Date;
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
