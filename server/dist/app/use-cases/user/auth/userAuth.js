"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getUserById = exports.verifyTokenAndRestPassword = exports.sendResetVerificationCode = exports.authenticateGoogleSignInUser = exports.login = exports.deleteOtp = exports.verifyOtpUser = exports.userRegister = void 0;
const userEntity_1 = __importStar(require("../../../../entities/userEntity"));
const customError_1 = __importDefault(require("../../../../utils/customError"));
const httpStatus_1 = require("../../../../types/httpStatus");
const sendMail_1 = __importDefault(require("../../../../utils/sendMail"));
const userEmails_1 = require("../../../../utils/userEmails");
// All business logics (actions need to be done using mongodb) will be here
// pass the database query to application interface
const userRegister = (user, userRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password } = user;
    // check is the email already in use
    const isEmailExist = yield userRepository.getUserbyEmail(email);
    if (isEmailExist)
        throw new customError_1.default("Email already exists", httpStatus_1.HttpStatus.BAD_REQUEST);
    const hashedPassword = yield authService.encryptpassword(password);
    const userEntity = (0, userEntity_1.default)(name, email, hashedPassword);
    // create new user
    const createdUser = yield userRepository.addUser(userEntity);
    const OTP = authService.generateOTP(); // generating a 6 digit OTP
    const emailSubject = "Account verification";
    (0, sendMail_1.default)(createdUser.email, emailSubject, (0, userEmails_1.otpEmail)(OTP, createdUser.name)); // Sending otp to the user email
    yield userRepository.addOTP(OTP, createdUser.id); //adding otp to the database
    return createdUser;
});
exports.userRegister = userRegister;
// verfiy given otp with db otp
const verifyOtpUser = (userOTP, userId, userRepository) => __awaiter(void 0, void 0, void 0, function* () {
    if (!userOTP)
        throw new customError_1.default("Please provide an OTP", httpStatus_1.HttpStatus.BAD_REQUEST);
    const otpUser = yield userRepository.findOtpUser(userId); // finding the OTP user with userId
    if (!otpUser)
        throw new customError_1.default("Invalid otp , try resending the otp", httpStatus_1.HttpStatus.BAD_REQUEST);
    if (otpUser.OTP === userOTP) {
        const wallet = yield userRepository.addWallet(userId);
        yield userRepository.updateProfile(userId, {
            isVerified: true,
            wallet: wallet._id,
        });
        return true;
    }
    else {
        throw new customError_1.default("Invalid OTP,try again", httpStatus_1.HttpStatus.BAD_REQUEST);
    }
});
exports.verifyOtpUser = verifyOtpUser;
const deleteOtp = (userId, userDbRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    const newOtp = authService.generateOTP();
    const deleted = yield userDbRepository.deleteOtpUser(userId); // delete the existing otp user from db
    if (deleted) {
        yield userDbRepository.addOTP(newOtp, userId); // create new otp user
    }
    const user = yield userDbRepository.getUserbyId(userId);
    if (user) {
        const emailSubject = "Account verification , New OTP";
        (0, sendMail_1.default)(user.email, emailSubject, (0, userEmails_1.otpEmail)(newOtp, user.name)); // Sending otp to the user email
    }
});
exports.deleteOtp = deleteOtp;
const login = (user, userDbRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = user;
    const isEmailExist = yield userDbRepository.getUserbyEmail(email);
    if (!isEmailExist)
        throw new customError_1.default("Invalid credentials", httpStatus_1.HttpStatus.UNAUTHORIZED);
    if (isEmailExist === null || isEmailExist === void 0 ? void 0 : isEmailExist.isBlocked)
        throw new customError_1.default("Your account is blocked by administrator", httpStatus_1.HttpStatus.FORBIDDEN);
    if (!(isEmailExist === null || isEmailExist === void 0 ? void 0 : isEmailExist.isVerified))
        throw new customError_1.default("Your account is not verified", httpStatus_1.HttpStatus.UNAUTHORIZED);
    if (!isEmailExist.password)
        throw new customError_1.default("Invalid credentials", httpStatus_1.HttpStatus.UNAUTHORIZED);
    const isPasswordMatched = yield authService.comparePassword(password, isEmailExist.password);
    if (!isPasswordMatched)
        throw new customError_1.default("Invalid credentials", httpStatus_1.HttpStatus.UNAUTHORIZED);
    const { accessToken, refreshToken } = authService.createTokens(isEmailExist.id, isEmailExist.name, isEmailExist.role);
    return { accessToken, refreshToken, isEmailExist };
});
exports.login = login;
const authenticateGoogleSignInUser = (userData, userDbRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, picture, email_verified } = userData;
    const isEmailExist = yield userDbRepository.getUserbyEmail(email);
    if (isEmailExist === null || isEmailExist === void 0 ? void 0 : isEmailExist.isBlocked)
        throw new customError_1.default("Your account is blocked by administrator", httpStatus_1.HttpStatus.FORBIDDEN);
    if (isEmailExist) {
        const { accessToken, refreshToken } = authService.createTokens(isEmailExist.id, isEmailExist.name, isEmailExist.role);
        return { accessToken, refreshToken, isEmailExist };
    }
    else {
        const googleSignInUser = (0, userEntity_1.googleSignInUserEntity)(name, email, picture, email_verified);
        const createdUser = yield userDbRepository.registerGoogleSignedUser(googleSignInUser);
        const userId = createdUser._id;
        const wallet = yield userDbRepository.addWallet(userId);
        yield userDbRepository.updateProfile(userId, { wallet: wallet._id });
        const { accessToken, refreshToken } = authService.createTokens(userId, createdUser.name, createdUser.role);
        return { accessToken, refreshToken, createdUser };
    }
});
exports.authenticateGoogleSignInUser = authenticateGoogleSignInUser;
const sendResetVerificationCode = (email, userDbRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    const isEmailExist = yield userDbRepository.getUserbyEmail(email);
    if (!isEmailExist)
        throw new customError_1.default(`${email} does not exist`, httpStatus_1.HttpStatus.BAD_REQUEST);
    const verificationCode = authService.getRandomString();
    const isUpdated = yield userDbRepository.updateVerificationCode(email, verificationCode);
    console.log(isUpdated);
    (0, sendMail_1.default)(email, "Reset password", (0, userEmails_1.forgotPasswordEmail)(isEmailExist.name, verificationCode));
});
exports.sendResetVerificationCode = sendResetVerificationCode;
const verifyTokenAndRestPassword = (verificationCode, password, userDbRepository, authService) => __awaiter(void 0, void 0, void 0, function* () {
    if (!verificationCode)
        throw new customError_1.default("Please provide a verification code", httpStatus_1.HttpStatus.BAD_REQUEST);
    const hashedPassword = yield authService.encryptpassword(password);
    const isPasswordUpdated = yield userDbRepository.verifyAndResetPassword(verificationCode, hashedPassword);
    if (!isPasswordUpdated)
        throw new customError_1.default("Invalid token or token expired", httpStatus_1.HttpStatus.BAD_REQUEST);
});
exports.verifyTokenAndRestPassword = verifyTokenAndRestPassword;
const getUserById = (id, userRepository) => __awaiter(void 0, void 0, void 0, function* () { return yield userRepository.getUserbyId(id); });
exports.getUserById = getUserById;
