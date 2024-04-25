import express from "express";
import { userDbRepository } from "../../../app/interfaces/userDbRepository";
import { authService } from "../../services/authService";
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
import menuController from "../../../adapters/menuController";
import { menuDbRepository } from "../../../app/interfaces/menuDbRepository";
import { MenuRepositoryMongodb } from "../../database/mongodb/repositories/MenuRepositoryMongodb";
import { userRepositoryMongodb } from "../../database/mongodb/repositories/userRepositoryMongodb";
import adminDbRepository from "../../../app/interfaces/AdminDbRepository";
import { adminRepositoryMongodb } from "../../database/mongodb/repositories/AdminRepositoryMongodb";

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
    TableSlotRepositoryMongodb,
    tableDbRepository,
    tableRepositoryMongodb,
    adminDbRepository,
    adminRepositoryMongodb
  );

  const _bookingController = bookingController(
    reservationServiceInterface,
    reservationService,
    bookingDbRepository,
    bookingRepositoryMongodb,
    restaurantDbRepository,
    restaurantRepositoryMongodb,
    tableDbRepository,
    tableRepositoryMongodb,
    userDbRepository,
    userRepositoryMongodb,
    TableSlotDbRepository,
    TableSlotRepositoryMongodb
  );

  const _menuController = menuController(
    menuDbRepository,
    MenuRepositoryMongodb,
    bookingDbRepository,
    bookingRepositoryMongodb,
    userDbRepository,
    userRepositoryMongodb
  );

  /******** user authentication Routes ********/
  router.post("/signup", controller.registerUser);
  router.post("/verify_otp", controller.verifyOtp);
  router.post("/resend_otp", controller.resendOtp);
  router.post("/login", controller.userLogin);
  router.post("/google_signIn", controller.googleSignIn); // google sign in
  router.post("/forgot_password", controller.forgotPassword);
  router.post("/reset_password/:token", controller.resetPassword);
  router.post("/email/unSubscribe", controller.updateEmailPreference);

  router.get("/users/:id", controller.userInfo);
  router.get("/profile", authenticateUser, controller.userProfile);
  router.patch("/profile/edit", authenticateUser, controller.updateUserInfo);
  router.get("/transactions", authenticateUser, controller.getTransactions);

  router.get("/restaurants", controller.getRestaurants);
  router.get("/restaurants/:restaurantID", controller.getSingleRestaurant);
  router.get("/tables/:tableID", controller.tableDetails);
  router.post("/review/add", authenticateUser, controller.createNewRating);
  router.patch("/bookmarks", authenticateUser, controller.updateBookmarks);

  /****************Booking Routes ********************/
  router.get("/bookings", authenticateUser, _bookingController.getAllbookings);
  router.get(
    "/bookings/:bookingID",
    authenticateUser,
    _bookingController.getBookingDetails
  );

  router.post(
    "/reserve_table",
    authenticateUser,
    _bookingController.reserveTable
  );
  router.patch(
    "/payment/status/:id",
    authenticateUser,
    _bookingController.updatePaymentStatus
  );
  router.patch(
    "/booking/cancel/:bookingID",
    authenticateUser,
    _bookingController.cancelBooking
  );
  router.post(
    "/booking/preOrder",
    authenticateUser,
    _bookingController.updatePreOrderedFood
  );
  router.delete(
    "/booking/preOrder",
    authenticateUser,
    _bookingController.deletePreOrderedFood
  );
  router.get("/banners", controller.getBanners);
  router.get("/menu", authenticateUser, _menuController.getMenu);

  return router;
};

export default userRoute;
