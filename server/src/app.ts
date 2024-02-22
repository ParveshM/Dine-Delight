import express, { Application } from "express";
import expressConfig from "./frameworks/webServer/expressConfig";
import startServer from "./frameworks/webServer/server";
import connectDB from "./frameworks/database/mongodb/connection";
const app: Application = express();

expressConfig(app);
startServer(app);
connectDB();
