import dotenv from "dotenv";
dotenv.config();

const configKeys = {
  PORT: process.env.PORT || (5000 as number),
  MONGO_URL: process.env.MONGO_URL as string,
  APP_EMAIL: process.env.APP_EMAIL as string,
  APP_PASSWORD: process.env.APP_PASSWORD as string,
};
export default configKeys;
