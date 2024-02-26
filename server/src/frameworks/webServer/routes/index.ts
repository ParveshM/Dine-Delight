import { Application } from "express";
import userRoute from "./userRoute";
import refreshTokenRoute from "./refreshTokenRoute";
import restaurantRoute from "./restaurantRoute";

const routes = (app: Application) => {
  app.use("/api/user", userRoute());
  app.use("/api/token", refreshTokenRoute());
  app.use("/api/restaurant", restaurantRoute());
};

export default routes;
