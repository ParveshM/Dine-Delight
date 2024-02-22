import express, { Application } from "express";
import morgan from "morgan";

const expressConfig = (app: Application) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan("dev"));
};
export default expressConfig;
