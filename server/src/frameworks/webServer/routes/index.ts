import { Application } from "express";
import userRoute from "./userRoute";
import refreshTokenRoute from "./refreshTokenRoute";
const routes = (app: Application) => {
  app.use("/api/user", userRoute());
  app.use("/api/token", refreshTokenRoute());
};

export default routes;
