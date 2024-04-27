import mongoose, { Types } from "mongoose";

export interface CreateRestaurantInterface {
  restaurantName: string;
  email: string;
  mobile: string;
  password: string;
  verificationToken: string;
}

export interface RestaurantInterface {
  id: string;
  restaurantName: string;
  slug: string;
  email: string;
  mobile: string;
  password: string;
  role: "seller";
  address?: string;
  description?: string;
  tableRatePerPerson?: number;
  location?: {
    type: string;
    coordinates: [number, number];
  };
  openingTime?: Date;
  closingTime?: Date;
  isListed?: boolean;
  isVerified?: boolean;
  isApproved?: boolean;
  isRejected: boolean;
  primaryImage?: string;
  secondaryImage?: string[];
}

export interface MenuItemInterface {
  name: string;
  price: number;
  image: string;
  category: "starters" | "main course" | "drinks" | "dessert";
  isVegetarian: boolean;
  restaurantId: Types.ObjectId;
  tags?: string[];
  discount: number;
}

export interface PaginateInterface {
  skip: number;
  limit: number;
}

export interface RestaurantReportFilter {
  restaurantId: string | Types.ObjectId;
  createdAt: Record<string, any>;
  bookingStatus?: string;
}

export interface SenderListInterface {
  userName: string;
  email: string;
  restaurantId: string;
  restaurantName: string;
  userId: string;
}
