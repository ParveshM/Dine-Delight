import { AuthserviceReturn } from "../../frameworks/services/authService";

export const authServiceInterface = (service: AuthserviceReturn) => {
  const encryptpassword = async (password: string) =>
    service.encryptPassword(password);

  const comparePassword = async (inputPassword: string, password: string) =>
    service.comparePassword(inputPassword, password);

  const generateOTP = () => service.generateOTP();

  return { encryptpassword, comparePassword, generateOTP };
};
export type AuthServiceInterfaceType = typeof authServiceInterface;
