import { Router } from "express";
import adminController from "../../../adapters/adminController";
import { authServiceInterface } from "../../../app/services-Interface/authServiceInterface";
import { authService } from "../../services/authService";
import { authenticateAdmin } from "../middlewares/authMiddleware";
import { userDbRepository } from "../../../app/interfaces/userDbRepository";
import { userRepositoryMongodb } from "../../database/mongodb/repositories/userRepositoryMongodb";
import { restaurantDbRepository } from "../../../app/interfaces/restaurantDbRepository";
import { restaurantRepositoryMongodb } from "../../database/mongodb/repositories/restaurantRepositoryMongodb";
import { bookingDbRepository } from "../../../app/interfaces/bookingDbRepository";
import { bookingRepositoryMongodb } from "../../database/mongodb/repositories/BookingRepositoryMongodb";
import adminDbRepository from "../../../app/interfaces/AdminDbRepository";
import { adminRepositoryMongodb } from "../../database/mongodb/repositories/AdminRepositoryMongodb";

export default () => {
  const router = Router();

  const controller = adminController(
    authServiceInterface,
    authService,
    userDbRepository,
    userRepositoryMongodb,
    restaurantDbRepository,
    restaurantRepositoryMongodb,
    bookingDbRepository,
    bookingRepositoryMongodb,
    adminDbRepository,
    adminRepositoryMongodb
  );

  router.post("/login", controller.adminLogin);
  router.get("/users", authenticateAdmin, controller.getAllUser);
  router.get("/restaurants", authenticateAdmin, controller.getAllRestaurants);
  router.patch("/block_user/:id", authenticateAdmin, controller.userBlock);
  router.patch(
    "/validate_restaurant/:id",
    authenticateAdmin,
    controller.validateRestaurant
  );
  router.patch(
    "/list_restaurant/:id",
    authenticateAdmin,
    controller.listRestaurant
  );
  router.get("/dashboard", authenticateAdmin, controller.dashboardDetails);
  router.get("/reports", authenticateAdmin, controller.generateReport);

  router.get("/banners", authenticateAdmin, controller.getBanners);
  router.post("/banners/add", authenticateAdmin, controller.addNewBanner);
  router.patch(
    "/banners/edit/:bannerId",
    authenticateAdmin,
    controller.updateBanner
  );
  router.delete(
    "/banners/remove/:bannerId",
    authenticateAdmin,
    controller.removBanner
  );

  return router;
};
