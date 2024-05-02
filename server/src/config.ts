import dotenv from "dotenv";
dotenv.config();

const configKeys = {
  PORT: process.env.PORT || (3000 as number),
  CLIENT_PORT: process.env.CLIENT_PORT as string,
  MONGO_URL: process.env.MONGO_URL as string,
  APP_EMAIL: process.env.APP_EMAIL as string,
  APP_PASSWORD: process.env.APP_PASSWORD as string,
  ACCESS_SECRET: process.env.ACCESS_SECRET as string,
  RERESH_SECRET: process.env.REFRESH_SECRET as string,
  ADMIN_EMAIL: process.env.ADMIN_EMAIL as string,
  ADMIN_PASSWORD: process.env.ADMIN_PASSWORD as string,
  CLIENT_ID: process.env.CLIENT_ID as string,
  CLIENT_SECRET: process.env.CLIENT_SECRET as string,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY as string,
};
export default configKeys;
