import { Application } from "express";
import userRoute from "./userRoute";

const routes = (app: Application) => {
  app.use("/api/user", userRoute());
};

export default routes;
