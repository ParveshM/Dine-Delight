export interface CreateUserInterface {
  name: string;
  email: string;
  password: string;
}

export interface UserInterface {
  name: string;
  email: string;
  profilePicture?: string;
  wallet: object;
  isVerified: boolean;
  isBlocked: boolean;
  bookmarks?: Array<string>;
}
