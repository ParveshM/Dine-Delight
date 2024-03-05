import express from "express";
import { userDbRepository } from "../../../app/interfaces/userDbRepository";
import { authService } from "../../services/authService";
import { userRepositoryMongodb } from "../../database/mongodb/repositories/userRepositoryMongodb";
import { authServiceInterface } from "../../../app/services-Interface/authServiceInterface";
import authController from "../../../adapters/authController";
import authenticateUser from "../middlewares/authMiddleware";

const userRoute = () => {
  const router = express.Router();

  const controller = authController(
    authServiceInterface,
    authService,
    userDbRepository,
    userRepositoryMongodb
  );
  router.post("/signup", controller.registerUser);
  router.post("/verify_otp", controller.verifyOtp);
  router.post("/resend_otp", controller.resendOtp);
  router.post("/login", controller.userLogin);
  router.post("/google_signIn", controller.googleSignIn); // google sign in
  router.get("/test", authenticateUser, (req, res) => {
    res.status(200).json("message from test router");
  });
  return router;
};

export default userRoute;
