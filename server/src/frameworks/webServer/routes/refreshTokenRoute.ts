import express from "express";
import { authServiceInterface } from "../../../app/services-Interface/authServiceInterface";
import { authService } from "../../services/authService";
import tokenContoller from "../../../adapters/tokenController";
import { userDbRepository } from "../../../app/interfaces/userDbRepository";
import { restaurantDbRepository } from "../../../app/interfaces/restaurantDbRepository";
import { restaurantRepositoryMongodb } from "../../database/mongodb/repositories/restaurantRepositoryMongodb";
import { userRepositoryMongodb } from "../../database/mongodb/repositories/userRepositoryMongodb";

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

  return router;
};
export default refreshTokenRoute;
