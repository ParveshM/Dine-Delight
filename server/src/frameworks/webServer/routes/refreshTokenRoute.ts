import express from "express";
import { authServiceInterface } from "../../../app/services-Interface/authServiceInterface";
import { authService } from "../../services/authService";
import tokenContoller from "../../../adapters/tokenController";

const refreshTokenRoute = () => {
  const router = express.Router();

  const controller = tokenContoller(authServiceInterface, authService);

  router.get("/get_newAccessToken", controller.getNewAccessToken);

  return router;
};
export default refreshTokenRoute;
