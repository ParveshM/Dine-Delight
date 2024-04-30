export interface CreateUserInterface {
  name: string;
  email: string;
  password: string;
}

export interface UserInterface {
  id: string;
  name: string;
  email: string;
  password: string;
  profilePicture: string;
  role: string;
  wallet: object;
  isVerified: boolean;
  isBlocked: boolean;
  bookmarks?: Array<string>;
  createdAt?: Date;
}
interface OrderItem {
  item: string;
  price: number;
  quantity: number;
}
export interface OrderInterface {
  user: string;
  restaurant: string;
  tableNumber: string;
  mobile: string;
  orderItems: OrderItem[];
  total: number;
}
