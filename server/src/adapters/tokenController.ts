import { NextFunction, Request, Response } from "express";
import { HttpStatus } from "../types/httpStatus";
import { AuthServiceInterfaceType } from "../app/services-Interface/authServiceInterface";
import { AuthService } from "../frameworks/services/authService";
import jwt, { JwtPayload } from "jsonwebtoken";
import configKeys from "../config";
import { UserDbInterface } from "../app/interfaces/userDbRepository";
import { UserRepositoryMongodbType } from "../frameworks/database/mongodb/repositories/userRepositoryMongodb";
import { restaurantDbInterface } from "../app/interfaces/restaurantDbRepository";
import { restaurantRepositoryMongodbType } from "../frameworks/database/mongodb/repositories/restaurantRepositoryMongodb";
import { getUserById } from "../app/use-cases/user/auth/userAuth";
import { getRestaurantById } from "../app/use-cases/restaurant/authRestaurant";

const tokenContoller = (
  authServiceInterface: AuthServiceInterfaceType,
  authServiceImpl: AuthService,
  userDbRepository: UserDbInterface,
  userDbRepositoryImpl: UserRepositoryMongodbType,
  restaurantDbRepository: restaurantDbInterface,
  restaurantDbRepositoryImpl: restaurantRepositoryMongodbType
) => {
  const authService = authServiceInterface(authServiceImpl());
  const dbRepositoryUser = userDbRepository(userDbRepositoryImpl());
  const dbRepositoryRestaurant = restaurantDbRepository(
    restaurantDbRepositoryImpl()
  );

  /**
   ** method : POST
   */
  // refresh access token
  const getNewAccessToken = (req: Request, res: Response) => {
    const { refresh_token } = req.body;

    if (!refresh_token) {
      return res
        .status(HttpStatus.UNAUTHORIZED)
        .json({ success: false, error: "Invalid refresh token" });
    }
    // verify the recieved refresh token and create new access token
    jwt.verify(
      refresh_token,
      configKeys.RERESH_SECRET,
      (err: any, user: any) => {
        if (err) {
          return res
            .status(HttpStatus.UNAUTHORIZED)
            .json({ message: "Refresh token is expired" });
        } else {
          console.log(user, "sjdflkjsa");
          const { id, name, role } = user;
          const { accessToken } = authService.createTokens(id, name, role);
          res.status(HttpStatus.OK).json({
            success: true,
            message: "Token refreshed successfully",
            access_token: accessToken,
          });
        }
      }
    );
  };

  /*
   * METHOD:GET,
   * Return acces token to client
   */

  const returnAccessToClient = async (req: Request, res: Response) => {
    const { access_token } = req.query as { access_token: string };
    if (!access_token)
      return res
        .status(HttpStatus.BAD_REQUEST)
        .json({ success: false, message: "Access token is required" });

    const token: JwtPayload = jwt.decode(access_token) as JwtPayload;
    if (token?.role === "user") {
      const user = await getUserById(token.id, dbRepositoryUser);
      return res
        .status(HttpStatus.OK)
        .json({ success: true, access_token, user });
    } else if (token?.role === "seller") {
      const restaurant = await getRestaurantById(
        token.id,
        dbRepositoryRestaurant
      );
      return res
        .status(HttpStatus.OK)
        .json({ success: true, access_token, user: restaurant });
    }
    return res.status(HttpStatus.OK).json({ success: true, access_token });
  };

  return { getNewAccessToken, returnAccessToClient };
};
export default tokenContoller;
