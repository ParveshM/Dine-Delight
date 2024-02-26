import RestaurantEntity, {
  RestaurantEntityType,
} from "../../../entities/restaurantEntity";
import { HttpStatus } from "../../../types/httpStatus";
import {
  CreateRestaurantInterface,
  RestaurantInterface,
} from "../../../types/restaurantInterface";
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
  const { restaurantName, email, mobile, password } = restaurantData;
  const isEmailExist = await restaurantRepository.getRestaurantByemail(email);
  if (isEmailExist)
    throw new CustomError("Email already exists", HttpStatus.BAD_REQUEST);

  const hashedPassword: string = await authService.encryptpassword(password);
  const verificationToken = authService.getRandomString(); // generates a random string using uuid
  const restaurant: RestaurantEntityType = RestaurantEntity(
    restaurantName,
    email,
    mobile,
    hashedPassword,
    verificationToken
  );
  const createdRestaurant = await restaurantRepository.addRestaurant(
    restaurant
  );
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
    throw new CustomError("Token expired ", HttpStatus.BAD_REQUEST);
  return updateVerification;
};
