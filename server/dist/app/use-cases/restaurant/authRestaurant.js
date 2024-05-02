"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRestaurantById = exports.restaurantLogin = exports.verifyAccount = exports.addNewRestaurant = void 0;
const restaurantEntity_1 = __importDefault(require("../../../entities/restaurantEntity"));
const httpStatus_1 = require("../../../types/httpStatus");
const customError_1 = __importDefault(require("../../../utils/customError"));
const sendMail_1 = __importDefault(require("../../../utils/sendMail"));
const sellerVerificationMail_1 = require("../../../utils/sellerVerificationMail");
// Register new user use_case
const addNewRestaurant = (restaurantData, restaurantRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    const { restaurantName, email, password } = restaurantData;
    const isEmailExist = yield restaurantRepository.getRestaurantByemail(email);
    if (isEmailExist)
        throw new customError_1.default("Email already exists", httpStatus_1.HttpStatus.BAD_REQUEST);
    const hashedPassword = yield authService.encryptpassword(password);
    const verificationToken = authService.getRandomString(); // generates a random string using uuid
    const restaurant = (0, restaurantEntity_1.default)(restaurantName, email, hashedPassword, verificationToken);
    const createdRestaurant = yield restaurantRepository.addRestaurant(restaurant);
    //   sent verification mail to restaurant email address
    if (createdRestaurant) {
        const emailSubject = "Seller verification ";
        (0, sendMail_1.default)(email, emailSubject, (0, sellerVerificationMail_1.sellerVerifyEmailPage)(restaurantName, verificationToken));
    }
    return createdRestaurant;
});
exports.addNewRestaurant = addNewRestaurant;
const verifyAccount = (token, restaurantRepository) => __awaiter(void 0, void 0, void 0, function* () {
    const updateVerification = yield restaurantRepository.verifyRestaurant(token);
    if (!updateVerification)
        throw new customError_1.default("Invalid token", httpStatus_1.HttpStatus.BAD_REQUEST);
    return updateVerification;
});
exports.verifyAccount = verifyAccount;
const restaurantLogin = (email, password, restaurantRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    const isEmailExist = yield restaurantRepository.getRestaurantByemail(email);
    if (!isEmailExist)
        throw new customError_1.default("Invalid credentials", httpStatus_1.HttpStatus.UNAUTHORIZED);
    if (!isEmailExist.isVerified)
        throw new customError_1.default("Please verify your email", httpStatus_1.HttpStatus.UNAUTHORIZED);
    const message = "Your account has not been approved by the admin yet. Please wait for approval.";
    if (!isEmailExist.isApproved)
        throw new customError_1.default(message, httpStatus_1.HttpStatus.UNAUTHORIZED);
    const isPasswordMatch = yield authService.comparePassword(password, isEmailExist.password);
    if (!isPasswordMatch)
        throw new customError_1.default("Invalid credentials", httpStatus_1.HttpStatus.BAD_REQUEST);
    const { accessToken, refreshToken } = authService.createTokens(isEmailExist.id, isEmailExist.restaurantName, isEmailExist.role);
    return { accessToken, refreshToken, isEmailExist };
});
exports.restaurantLogin = restaurantLogin;
const getRestaurantById = (id, restaurantRepository) => __awaiter(void 0, void 0, void 0, function* () { return yield restaurantRepository.getRestaurantById(id); });
exports.getRestaurantById = getRestaurantById;
