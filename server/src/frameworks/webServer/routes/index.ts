import { Application } from "express";
import userRoute from "./userRoute";
import refreshTokenRoute from "./refreshTokenRoute";
import restaurantRoute from "./restaurantRoute";
import adminRoute from "./adminRoute";
import chatRoute from "./chatRoute";

const routes = (app: Application) => {
  app.use("/api/user", userRoute());
  app.use("/api/token", refreshTokenRoute());
  app.use("/api/restaurant", restaurantRoute());
  app.use("/api/admin", adminRoute());
  app.use("/api/chat", chatRoute());
};

export default routes;
