import express, { Request, Response } from "express";
import restaurantController from "../../../adapters/restaurantController";
import { authServiceInterface } from "../../../app/services-Interface/authServiceInterface";
import { authService } from "../../services/authService";
import { restaurantDbRepository } from "../../../app/interfaces/restaurantDbRepository";
import { restaurantRepositoryMongodb } from "../../database/mongodb/repositories/restaurantRepositoryMongodb";
import { authenticateSeller } from "../middlewares/authMiddleware";

const restaurantRoute = () => {
  const router = express.Router();
  const controller = restaurantController(
    authServiceInterface,
    authService,
    restaurantDbRepository,
    restaurantRepositoryMongodb
  );

  router.post("/signup", controller.signup);
  router.post("/verify_token/:token", controller.verifyToken);
  router.post("/login", controller.login);
  router.put(
    "/update_details",
    authenticateSeller,
    controller.updateRestaurantDetails
  );

  return router;
};
export default restaurantRoute;
