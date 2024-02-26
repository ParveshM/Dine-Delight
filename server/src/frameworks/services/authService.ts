import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import configKeys from "../../config";
import crypto from "crypto";
// Auth service will provide all the resusable functionlity
export const authService = () => {
  // create a hashed password
  const encryptPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  };
  // Compare input password against db password
  const comparePassword = async (inputPassword: string, password: string) => {
    return await bcrypt.compare(inputPassword, password);
  };
  // generate a 6 digit otp
  const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return `${otp}`;
  };

  const getRandomString = () => crypto.randomUUID();
  // Create createAccessToken
  const createTokens = (id: string, name: string, role: string) => {
    const payload = {
      id,
      name,
      role,
    };
    const accessToken = jwt.sign(payload, configKeys.ACCESS_SECRET, {
      expiresIn: "5m",
    });
    const refreshToken = jwt.sign(payload, configKeys.RERESH_SECRET, {
      expiresIn: "2d",
    });

    return { accessToken, refreshToken };
  };
  return {
    encryptPassword,
    generateOTP,
    comparePassword,
    createTokens,
    getRandomString,
  };
};
export type AuthService = typeof authService;
export type AuthserviceReturn = ReturnType<AuthService>;
