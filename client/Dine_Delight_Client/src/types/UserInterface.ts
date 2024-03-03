export type UserInterface = {
  _id: string;
  name: string;
  email: string;
  password: string;
  profilePicture?: string;
  role: string;
  wallet: object;
  isVerified: boolean;
  isBlocked: boolean;
  bookmarks?: Array<string>;
  createdAt: Date;
};
