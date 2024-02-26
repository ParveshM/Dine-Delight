export interface CreateRestaurantInterface {
  restaurantName: string;
  email: string;
  mobile: string;
  password: string;
  verificationToken: string;
}

export interface RestaurantInterface {
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
  primaryImage?: string;
  secondaryImage?: { url: string }[];
}
