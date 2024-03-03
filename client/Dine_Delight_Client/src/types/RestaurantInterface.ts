export interface RestaurantInterface {
  _id: string;
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
  isListed: boolean;
  isVerified?: boolean;
  isApproved?: boolean;
  isRejected: boolean;
  primaryImage?: string;
  secondaryImage?: { url: string }[];
}

export interface newRestaurantInterface {
  _id: string;
  restaurantName: string;
  email: string;
  createdAt: string;
}
