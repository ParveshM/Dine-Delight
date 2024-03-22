import express from "express";
import { authServiceInterface } from "../../../app/services-Interface/authServiceInterface";
import { authService } from "../../services/authService";
import tokenContoller from "../../../adapters/tokenController";
import { userRepositoryMongodb } from "../../database/mongodb/repositories/userRepositoryMongodb";
import { userDbRepository } from "../../../app/interfaces/userDbRepository";
import { restaurantDbRepository } from "../../../app/interfaces/restaurantDbRepository";
import { restaurantRepositoryMongodb } from "../../database/mongodb/repositories/restaurantRepositoryMongodb";

const refreshTokenRoute = () => {
  const router = express.Router();
  const controller = tokenContoller(
    authServiceInterface,
    authService,
    userDbRepository,
    userRepositoryMongodb,
    restaurantDbRepository,
    restaurantRepositoryMongodb
  );

  router.get("/accessToken", controller.returnAccessToClient);
  router.post("/refresh_token", controller.getNewAccessToken);
  router.put("/clear_token", controller.clearToken);

  return router;
};
export default refreshTokenRoute;
