import express, { Application } from "express";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
const expressConfig = (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan("dev"));
  app.use(helmet()); // for extra req security
  app.use(cookieParser());
  const corsOptions = {
    origin: "*",
    credentials: true,
    optionsSuccessStatus: 200,
    methods: ["GET, PUT", "PATCH", "DELETE"],
  };
  app.use(cors(corsOptions));
};

export default expressConfig;
