import { AuthserviceReturn } from "../../frameworks/services/authService";

// Auth service interface to see the availbale services in auth

export const authServiceInterface = (service: AuthserviceReturn) => {
  const encryptpassword = async (password: string) =>
    service.encryptPassword(password);

  const comparePassword = async (inputPassword: string, password: string) =>
    service.comparePassword(inputPassword, password);

  const generateOTP = () => service.generateOTP();

  const getRandomString = () => service.getRandomString();

  const createTokens = (id: string, name: string, role: string) =>
    service.createTokens(id, name, role);

  return {
    encryptpassword,
    comparePassword,
    generateOTP,
    getRandomString,
    createTokens,
  };
};
export type AuthServiceInterfaceType = typeof authServiceInterface;
