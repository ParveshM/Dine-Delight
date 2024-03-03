import configKeys from "../../../config";
import { HttpStatus } from "../../../types/httpStatus";
import CustomError from "../../../utils/customError";
import { AuthServiceInterfaceType } from "../../services-Interface/authServiceInterface";

export const loginAdmin = async (
  email: string,
  password: string,
  authService: ReturnType<AuthServiceInterfaceType>
) => {
  console.log(password, email);
  if (
    email === configKeys.ADMIN_EMAIL &&
    password === configKeys.ADMIN_PASSWORD
  ) {
    const { accessToken, refreshToken } = authService.createTokens(
      email,
      "Admin_User",
      "admin"
    );
    return { accessToken, refreshToken };
  }
  throw new CustomError("Invalid credentials", HttpStatus.UNAUTHORIZED);
};
