import { Router } from "express";
import adminController from "../../../adapters/adminController";
import { authServiceInterface } from "../../../app/services-Interface/authServiceInterface";
import { authService } from "../../services/authService";

export default () => {
  const router = Router();

  const controller = adminController(authServiceInterface, authService);
  router.post("/login", controller.adminLogin);

  return router;
};
