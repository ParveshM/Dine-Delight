export interface RestaurantInterface {
  _id: string;
  restaurantName: string;
  slug: string;
  email: string;
  phone: string;
  address?: string;
  description?: string;
  tableRatePerPerson?: number;
  location?: {
    type: string;
    coordinates: [number, number];
  };
  rating?: RatingInterface[];
  openingTime?: string;
  closingTime?: string;
  isListed: boolean;
  primaryImage?: string;
  secondaryImages?: string[];
}

export interface RatingInterface {
  _id: string;
  restaurantId: string;
  userId: string;
  rating: number;
  description: string;
}
export interface ReviewInterface {
  _id: string;
  userId: {
    _id: string;
    name: string;
    email: string;
  };
  rating: number;
  description: string;
  createdAt: Date;
}
export interface newRestaurantInterface {
  _id: string;
  restaurantName: string;
  email: string;
  createdAt: string;
}
export interface TableInterface {
  tableNumber: string;
  capacity: number;
  location: "In" | "Out";
}
export interface TimeSlotInterface {
  startTime: string;
  endTime: string;
  _id: string;
}

export interface TableSlotInterface {
  _id: string | null;
  tableId: string | null;
  slotDate: string | null;
  startTime: string | null;
  endTime: string | null;
  isAvailable: boolean | null;
}
