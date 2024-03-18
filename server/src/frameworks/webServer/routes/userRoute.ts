import express from "express";
import { userDbRepository } from "../../../app/interfaces/userDbRepository";
import { authService } from "../../services/authService";
import { userRepositoryMongodb } from "../../database/mongodb/repositories/userRepositoryMongodb";
import { authServiceInterface } from "../../../app/services-Interface/authServiceInterface";
import userController from "../../../adapters/userController";
import authenticateUser from "../middlewares/authMiddleware";
import { restaurantRepositoryMongodb } from "../../database/mongodb/repositories/restaurantRepositoryMongodb";
import { restaurantDbRepository } from "../../../app/interfaces/restaurantDbRepository";
import { TableSlotDbRepository } from "../../../app/interfaces/TableSlotdbRepository";
import { TableSlotRepositoryMongodb } from "../../database/mongodb/repositories/TableSlotRepositoryMongodb";
import bookingController from "../../../adapters/bookingController";
import { reservationService } from "../../services/reservationService";
import { reservationServiceInterface } from "../../../app/services-Interface/reservationServiceInterface";
import { bookingDbRepository } from "../../../app/interfaces/bookingDbRepository";
import { bookingRepositoryMongodb } from "../../database/mongodb/repositories/BookingRepositoryMongodb";
import { tableDbRepository } from "../../../app/interfaces/tableDbRepository";
import { tableRepositoryMongodb } from "../../database/mongodb/repositories/tableRepositoryMongoDb";

const userRoute = () => {
  const router = express.Router();

  const controller = userController(
    authServiceInterface,
    authService,
    userDbRepository,
    userRepositoryMongodb,
    restaurantDbRepository,
    restaurantRepositoryMongodb,
    TableSlotDbRepository,
    TableSlotRepositoryMongodb
  );

  const _bookingController = bookingController(
    reservationServiceInterface,
    reservationService,
    bookingDbRepository,
    bookingRepositoryMongodb,
    restaurantDbRepository,
    restaurantRepositoryMongodb,
    tableDbRepository,
    tableRepositoryMongodb
  );

  /******** user authentication Routes ********/
  router.post("/signup", controller.registerUser);
  router.post("/verify_otp", controller.verifyOtp);
  router.post("/resend_otp", controller.resendOtp);
  router.post("/login", controller.userLogin);
  router.post("/google_signIn", controller.googleSignIn); // google sign in
  router.post("/forgot_password", controller.forgotPassword);
  router.post("/reset_password/:token", controller.resetPassword);
  router.get("/get_restaurants", controller.getRestaurants);
  router.get(
    "/get_singleRestaurant/:restaurantID",
    controller.getSingleRestaurant
  );

  router.post(
    "/reserve_table",
    authenticateUser,
    _bookingController.reserveTable
  );

  /********************************/
  router.get("/test", authenticateUser, (req, res) => {
    res.status(200).json("message from test router");
  });

  return router;
};

export default userRoute;
