import bcrypt from "bcrypt";
// Auth service will provide all the resusable functionlity
export const authService = () => {
  const encryptPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  };
  const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return `${otp}`;
  };

  const comparePassword = async (inputPassword: string, password: string) => {
    return await bcrypt.compare(inputPassword, password);
  };

  return {
    encryptPassword,
    generateOTP,
    comparePassword,
  };
};
export type AuthService = typeof authService;
export type AuthserviceReturn = ReturnType<AuthService>;
