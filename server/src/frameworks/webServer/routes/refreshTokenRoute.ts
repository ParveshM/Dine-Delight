import express from "express";
import { authServiceInterface } from "../../../app/services-Interface/authServiceInterface";
import { authService } from "../../services/authService";
import tokenContoller from "../../../adapters/tokenController";
import authenticateUser from "../middlewares/authMiddleware";

const refreshTokenRoute = () => {
  const router = express.Router();
  const controller = tokenContoller(authServiceInterface, authService);

  router.post("/get_accessToken", controller.returnAccessToClient);
  router.post("/refresh_token", controller.getNewAccessToken);
  router.post("/clear_token", controller.clearToken);

  return router;
};
export default refreshTokenRoute;
