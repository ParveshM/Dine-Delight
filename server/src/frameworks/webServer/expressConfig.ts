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

  const corsConfig = {
    origin: true,
    credentials: true,
  };

  app.use(cors(corsConfig));
  app.options("*", cors(corsConfig));
};

export default expressConfig;
