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

export type Filter = {
  query: Record<string, any>;
  limit?: number;
  skip?: number;
  sortBy?: Record<string, "asc" | "desc">;
};
