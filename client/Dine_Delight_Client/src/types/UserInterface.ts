export type UserInterface = {
  _id: string;
  name: string;
  email: string;
  profilePicture?: string;
  role: string;
  isVerified: boolean;
  isBlocked: boolean;
  bookmarks?: string[];
  createdAt: Date;
};

export interface UserWalletInterface {
  _id: string;
  userId: string;
  balance: number;
}
export interface TransactionsInterface {
  _id: string;
  type: "Debit" | "Credit";
  description: string;
  amount: number;
  createdAt: Date;
}
interface OrderItem {
  item: {
    _id: string;
    name: string;
  };
  price: number;
  quantity: number;
}
export interface OrderInterface {
  _id: string;
  orderId: string;
  user: UserInterface;
  restaurant: string;
  tableNumber: string;
  mobile: string;
  orderItems: OrderItem[];
  total: number;
  status: "Pending" | "Confirmed" | "InProgress" | "Completed" | "Cancelled";
  createdAt: Date;
}
