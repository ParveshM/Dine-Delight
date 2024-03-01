import createUserEntity, { userEntityType } from "../../../entities/userEntity";
import {
  CreateUserInterface,
  UserInterface,
} from "../../../types/userInterface";
import { UserDbInterface } from "../../interfaces/userDbRepository";
import { AuthServiceInterfaceType } from "../../services-Interface/authServiceInterface";
import CustomError from "../../../utils/customError";
import { HttpStatus } from "../../../types/httpStatus";
import sentMail from "../../../utils/sendMail";
import { otpEmail } from "../../../utils/otpEmail";

// All business logics (actions need to be done using mongodb) will be here
// pass the database query to application interface

export const userRegister = async (
  user: CreateUserInterface,
  userRepository: ReturnType<UserDbInterface>,
  authService: ReturnType<AuthServiceInterfaceType>
) => {
  const { name, email, password } = user;

  // check is the email already in use
  const isEmailExist = await userRepository.getUserbyEmail(email);
  if (isEmailExist)
    throw new CustomError("Email already exists", HttpStatus.BAD_REQUEST);

  const hashedPassword: string = await authService.encryptpassword(password);

  const userEntity: userEntityType = createUserEntity(
    name,
    email,
    hashedPassword
  );

  // create new user
  const createdUser: UserInterface = await userRepository.addUser(userEntity);
  console.log(createdUser, "== createdUser");

  const OTP = authService.generateOTP(); // generating a 6 digit OTP
  console.log(OTP, "== OTP");
  const emailSubject = "Account verification";
  sentMail(createdUser.email, emailSubject, otpEmail(OTP, createdUser.name)); // Sending otp to the user email

  await userRepository.addOTP(OTP, createdUser.id); //adding otp to the database
  return createdUser;
};

// verfiy given otp with db otp
export const verifyOtpUser = async (
  userOTP: string,
  userId: string,
  userRepository: ReturnType<UserDbInterface>
) => {
  if (!userOTP)
    throw new CustomError("Please provide an OTP", HttpStatus.BAD_REQUEST);

  const otpUser = await userRepository.findOtpUser(userId); // finding the OTP user with userId
  if (!otpUser)
    throw new CustomError(
      "Invalid otp , try resending the otp",
      HttpStatus.BAD_REQUEST
    );

  if (otpUser.OTP === userOTP) {
    await userRepository.updateVerifiedUser(userId);
    return true;
  } else {
    throw new CustomError("Invalid OTP,try again", HttpStatus.BAD_REQUEST);
  }
};

export const deleteOtp = async (
  userId: string,
  userDbRepository: ReturnType<UserDbInterface>,
  authService: ReturnType<AuthServiceInterfaceType>
) => {
  const newOtp: string = authService.generateOTP();
  const deleted = await userDbRepository.deleteOtpUser(userId); // delete the existing otp user from db
  if (deleted) {
    await userDbRepository.addOTP(newOtp, userId); // create new otp user
  }
  const user = await userDbRepository.getUserbyId(userId);
  if (user) {
    const emailSubject = "Account verification , New OTP";
    sentMail(user.email, emailSubject, otpEmail(newOtp, user.name)); // Sending otp to the user email
  }
};

export const login = async (
  user: { email: string; password: string },
  userDbRepository: ReturnType<UserDbInterface>,
  authService: ReturnType<AuthServiceInterfaceType>
) => {
  const { email, password } = user;
  const isEmailExist = await userDbRepository.getUserbyEmail(email);

  if (!isEmailExist)
    throw new CustomError("Invalid credentials", HttpStatus.UNAUTHORIZED);

  if (!isEmailExist?.isVerified)
    throw new CustomError(
      "Your account is not verified",
      HttpStatus.UNAUTHORIZED
    );

  const isPasswordMatched = await authService.comparePassword(
    password,
    isEmailExist.password
  );
  if (!isPasswordMatched)
    throw new CustomError("Invalid credentials", HttpStatus.UNAUTHORIZED);

  const { accessToken, refreshToken } = authService.createTokens(
    isEmailExist.id,
    isEmailExist.name,
    isEmailExist.role
  );
  return { accessToken, refreshToken, isEmailExist };
};
