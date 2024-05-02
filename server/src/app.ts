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
import path from "path";
const app: Application = express();

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: true,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(
  express.static(path.join(__dirname, "../../client/Dine_Delight_Client/dist"))
);

socketConfig(io);
expressConfig(app);
connectDB();
routes(app);

app.get("*", (req: Request, res: Response) => {
  res.sendFile(
    path.join(__dirname, "../../client/Dine_Delight_Client/dist/index.html")
  );
});

startServer(httpServer);

app.use(errorHandlingMidleware);
app.all("*", (req, res, next: NextFunction) => {
  next(new CustomError(`Not found : ${req.url}`, 404));
});
