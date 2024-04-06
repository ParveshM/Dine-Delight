import express, { Application, NextFunction, Request, Response } from "express";
import expressConfig from "./frameworks/webServer/expressConfig";
import startServer from "./frameworks/webServer/server";
import connectDB from "./frameworks/database/mongodb/connection";
import CustomError from "./utils/customError";
import errorHandlingMidleware from "./frameworks/webServer/middlewares/errorhandler.middleware";
import routes from "./frameworks/webServer/routes";
import { createServer } from "http";
import { Server } from "socket.io";
import socketConfig from "./frameworks/webSocket/socket";

const app: Application = express();

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: true,
    methods: ["GET", "POST"],
    credentials: true,
  },
});
socketConfig(io);
expressConfig(app);
connectDB();
routes(app);
startServer(httpServer);

app.use(errorHandlingMidleware);
app.all("*", (req, res, next: NextFunction) => {
  next(new CustomError(`Not found : ${req.url}`, 404));
});
