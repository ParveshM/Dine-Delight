export interface RestaurantInterface {
  _id: string;
  restaurantName: string;
  slug: string;
  email: string;
  mobile: string;
  address?: string;
  description?: string;
  tableRatePerPerson?: number;
  location?: {
    type: string;
    coordinates: [number, number];
  };
  openingTime?: string;
  closingTime?: string;
  isListed: boolean;
  primaryImage?: string;
  secondaryImages?: string[];
}

export interface newRestaurantInterface {
  _id: string;
  restaurantName: string;
  email: string;
  createdAt: string;
}

export interface TimeSlotInterface {
  startTime: string;
  endTime: string;
  _id: string;
}

export interface TableSlotInterface {
  _id: string;
  tableId: string;
  slotDate: Date;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}
