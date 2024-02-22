import mongoose from "mongoose";
import configKeys from "../../../config";

const connectDB = async () => {
  try {
    await mongoose.connect(configKeys.MONGO_URL);
    console.log("Databaser connected successfully🚀");
  } catch (error) {
    console.log("Error connecting database: " + error);
  }
};
export default connectDB;
