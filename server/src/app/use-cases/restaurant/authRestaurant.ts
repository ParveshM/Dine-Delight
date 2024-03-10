import RestaurantEntity, {
  RestaurantEntityType,
} from "../../../entities/restaurantEntity";
import { HttpStatus } from "../../../types/httpStatus";
import { CreateRestaurantInterface } from "../../../types/restaurantInterface";
import CustomError from "../../../utils/customError";
import sentMail from "../../../utils/sendMail";
import { restaurantDbInterface } from "../../interfaces/restaurantDbRepository";
import { AuthServiceInterfaceType } from "../../services-Interface/authServiceInterface";
import { sellerVerifyEmailPage } from "../../../utils/sellerVerificationMail";

// Register new user use_case
export const addNewRestaurant = async (
  restaurantData: CreateRestaurantInterface,
  restaurantRepository: ReturnType<restaurantDbInterface>,
  authService: ReturnType<AuthServiceInterfaceType>
) => {
  const { restaurantName, email, password } = restaurantData;
  const isEmailExist = await restaurantRepository.getRestaurantByemail(email);
  if (isEmailExist)
    throw new CustomError("Email already exists", HttpStatus.BAD_REQUEST);

  const hashedPassword: string = await authService.encryptpassword(password);
  const verificationToken = authService.getRandomString(); // generates a random string using uuid
  const restaurant: RestaurantEntityType = RestaurantEntity(
    restaurantName,
    email,
    hashedPassword,
    verificationToken
  );
  const createdRestaurant = await restaurantRepository.addRestaurant(
    restaurant
  );
  console.log(verificationToken, "token");
  //   sent verification mail to restaurant email address
  if (createdRestaurant) {
    const emailSubject = "Seller verification ";
    sentMail(
      email,
      emailSubject,
      sellerVerifyEmailPage(restaurantName, verificationToken)
    );
  }
  return createdRestaurant;
};

export const verifyAccount = async (
  token: string,
  restaurantRepository: ReturnType<restaurantDbInterface>
) => {
  const updateVerification = await restaurantRepository.verifyRestaurant(token);
  if (!updateVerification)
    throw new CustomError("Invalid token", HttpStatus.BAD_REQUEST);
  return updateVerification;
};

export const restaurantLogin = async (
  email: string,
  password: string,
  restaurantRepository: ReturnType<restaurantDbInterface>,
  authService: ReturnType<AuthServiceInterfaceType>
) => {
  const isEmailExist = await restaurantRepository.getRestaurantByemail(email);
  if (!isEmailExist)
    throw new CustomError("Invalid credentials", HttpStatus.UNAUTHORIZED);

  if (!isEmailExist.isVerified)
    throw new CustomError("Please verify your email", HttpStatus.UNAUTHORIZED);

  const message =
    "Your account has not been approved by the admin yet. Please wait for approval.";

  if (!isEmailExist.isApproved)
    throw new CustomError(message, HttpStatus.UNAUTHORIZED);

  const isPasswordMatch = await authService.comparePassword(
    password,
    isEmailExist.password
  );
  if (!isPasswordMatch)
    throw new CustomError("Invalid credentials", HttpStatus.BAD_REQUEST);
  const { accessToken, refreshToken } = authService.createTokens(
    isEmailExist.id,
    isEmailExist.restaurantName,
    isEmailExist.role
  );
  return { accessToken, refreshToken, isEmailExist };
};

export const getRestaurantById = async (
  id: string,
  restaurantRepository: ReturnType<restaurantDbInterface>
) => await restaurantRepository.getRestaurantById(id);
