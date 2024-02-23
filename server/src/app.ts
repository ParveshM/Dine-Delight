import express, { Application, NextFunction } from "express";
import expressConfig from "./frameworks/webServer/expressConfig";
import startServer from "./frameworks/webServer/server";
import connectDB from "./frameworks/database/mongodb/connection";
import errorHandlingMidleware from "./frameworks/webServer/middlewares/errorhandler.middleware";
import CustomError from "./utils/customError";
const app: Application = express();

expressConfig(app);
startServer(app);
connectDB();

app.use(errorHandlingMidleware);
app.all("*", (req, res, next: NextFunction) => {
  next(new CustomError(`Not found : ${req.url}`, 404));
});
