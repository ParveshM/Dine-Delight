import { Router } from "express";
import adminController from "../../../adapters/adminController";
import { authServiceInterface } from "../../../app/services-Interface/authServiceInterface";
import { authService } from "../../services/authService";
import { authenticateAdmin } from "../middlewares/authMiddleware";
import { userDbRepository } from "../../../app/interfaces/userDbRepository";
import { userRepositoryMongodb } from "../../database/mongodb/repositories/userRepositoryMongodb";
import { restaurantDbRepository } from "../../../app/interfaces/restaurantDbRepository";
import { restaurantRepositoryMongodb } from "../../database/mongodb/repositories/restaurantRepositoryMongodb";

export default () => {
  const router = Router();

  const controller = adminController(
    authServiceInterface,
    authService,
    userDbRepository,
    userRepositoryMongodb,
    restaurantDbRepository,
    restaurantRepositoryMongodb
  );

  router.post("/login", controller.adminLogin);
  router.get("/get_allUsers", authenticateAdmin, controller.getAllUser);
  router.get(
    "/get_allRestaurants",
    authenticateAdmin,
    controller.getAllRestaurants
  );
  router.post("/block_user/:id", authenticateAdmin, controller.userBlock);
  router.patch("/approve_restaurant/:id", controller.approveRestaurant);
  router.patch("/reject_restaurant/:id", controller.rejectRestaurant);
  router.patch("/list_restaurant/:id", controller.listRestaurant);

  return router;
};
