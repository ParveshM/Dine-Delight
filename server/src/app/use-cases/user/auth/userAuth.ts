import createUserEntity, {
  googleSignInUserEntity,
  googleSignInUserEntityType,
  userEntityType,
} from "../../../../entities/userEntity";
import {
  CreateUserInterface,
  UserInterface,
} from "../../../../types/userInterface";
import { UserDbInterface } from "../../../interfaces/userDbRepository";
import { AuthServiceInterfaceType } from "../../../services-Interface/authServiceInterface";
import CustomError from "../../../../utils/customError";
import { HttpStatus } from "../../../../types/httpStatus";
import sentMail from "../../../../utils/sendMail";
import { forgotPasswordEmail, otpEmail } from "../../../../utils/userEmails";
import { GoogleResponseType } from "../../../../types/googleResponseType";

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

  const OTP = authService.generateOTP(); // generating a 6 digit OTP
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

  if (isEmailExist?.isBlocked)
    throw new CustomError(
      "Your account is blocked by administrator",
      HttpStatus.FORBIDDEN
    );

  if (!isEmailExist?.isVerified)
    throw new CustomError(
      "Your account is not verified",
      HttpStatus.UNAUTHORIZED
    );
  if (!isEmailExist.password)
    throw new CustomError("Invalid credentials", HttpStatus.UNAUTHORIZED);
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

export const authenticateGoogleSignInUser = async (
  userData: GoogleResponseType,
  userDbRepository: ReturnType<UserDbInterface>,
  authService: ReturnType<AuthServiceInterfaceType>
) => {
  const { name, email, picture, email_verified } = userData;

  const isEmailExist = await userDbRepository.getUserbyEmail(email);
  if (isEmailExist?.isBlocked)
    throw new CustomError(
      "Your account is blocked by administrator",
      HttpStatus.FORBIDDEN
    );

  if (isEmailExist) {
    const { accessToken, refreshToken } = authService.createTokens(
      isEmailExist.id,
      isEmailExist.name,
      isEmailExist.role
    );

    return { accessToken, refreshToken, isEmailExist };
  } else {
    const googleSignInUser: googleSignInUserEntityType = googleSignInUserEntity(
      name,
      email,
      picture,
      email_verified
    );

    const createdUser: any = await userDbRepository.registerGoogleSignedUser(
      googleSignInUser
    );

    const { accessToken, refreshToken } = authService.createTokens(
      createdUser.id,
      createdUser.name,
      createdUser.role
    );
    return { accessToken, refreshToken, createdUser };
  }
};

export const sendResetVerificationCode = async (
  email: string,
  userDbRepository: ReturnType<UserDbInterface>,
  authService: ReturnType<AuthServiceInterfaceType>
) => {
  const isEmailExist = await userDbRepository.getUserbyEmail(email);

  if (!isEmailExist)
    throw new CustomError(`${email} does not exist`, HttpStatus.BAD_REQUEST);

  const verificationCode = authService.getRandomString();

  const isUpdated = await userDbRepository.updateVerificationCode(
    email,
    verificationCode
  );
  console.log(isUpdated);
  sentMail(
    email,
    "Reset password",
    forgotPasswordEmail(isEmailExist.name, verificationCode)
  );
};

export const verifyTokenAndRestPassword = async (
  verificationCode: string,
  password: string,
  userDbRepository: ReturnType<UserDbInterface>,
  authService: ReturnType<AuthServiceInterfaceType>
) => {
  if (!verificationCode)
    throw new CustomError(
      "Please provide a verification code",
      HttpStatus.BAD_REQUEST
    );
  const hashedPassword = await authService.encryptpassword(password);
  const isPasswordUpdated = await userDbRepository.verifyAndResetPassword(
    verificationCode,
    hashedPassword
  );
  console.log(isPasswordUpdated);

  if (!isPasswordUpdated)
    throw new CustomError(
      "Invalid token or token expired",
      HttpStatus.BAD_REQUEST
    );
};

export const getUserById = async (
  id: string,
  userRepository: ReturnType<UserDbInterface>
) => await userRepository.getUserbyId(id);
