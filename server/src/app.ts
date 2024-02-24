import express, { Application, NextFunction } from "express";
import expressConfig from "./frameworks/webServer/expressConfig";
import startServer from "./frameworks/webServer/server";
import connectDB from "./frameworks/database/mongodb/connection";
import CustomError from "./utils/customError";
import errorHandlingMidleware from "./frameworks/webServer/middlewares/errorhandler.middleware";
const app: Application = express();
import routes from "./frameworks/webServer/routes";

expressConfig(app);
connectDB();
routes(app);
startServer(app);

app.use(errorHandlingMidleware);
app.all("*", (req, res, next: NextFunction) => {
  next(new CustomError(`Not found : ${req.url}`, 404));
});
