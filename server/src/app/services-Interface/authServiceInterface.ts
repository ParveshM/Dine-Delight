import { AuthserviceReturn } from "../../frameworks/services/authService";

// Auth service interface to see the availbale services in auth

export const authServiceInterface = (service: AuthserviceReturn) => {
  const encryptpassword = async (password: string) =>
    service.encryptPassword(password);

  const comparePassword = async (inputPassword: string, password: string) =>
    service.comparePassword(inputPassword, password);

  const generateOTP = () => service.generateOTP();

  const createAccessToken = (user: {
    id: string;
    name: string;
    role: string;
  }) => service.createAccessToken(user);

  const createRefreshToken = (user: {
    id: string;
    name: string;
    role: string;
  }) => service.createRefreshToken(user);

  return {
    encryptpassword,
    comparePassword,
    generateOTP,
    createAccessToken,
    createRefreshToken,
  };
};
export type AuthServiceInterfaceType = typeof authServiceInterface;
