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
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDbRepository = void 0;
// Interface for the database repository that we need to use
/*
 * User db repository interfaces
 */
const userDbRepository = (repository) => {
    const getUserbyEmail = (email) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getUserbyEmail(email); });
    const getUserbyId = (id) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getUserbyId(id); });
    const updateUserBlock = (id, status) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.updateUserBlock(id, status); });
    const addUser = (user) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.addUser(user); });
    const addWallet = (userID) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.addWallet(userID); });
    const getWalletByUseId = (userId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getWalletByUseId(userId); });
    const updateWallet = (userId, newBalance) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.updateWallet(userId, newBalance); });
    const createTransaction = (transactionDetails) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.createTransaction(transactionDetails); });
    const getTransactions = (walletId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.allTransactions(walletId); });
    const registerGoogleSignedUser = (user) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.registerGoogleSignedUser(user); });
    const addOTP = (otp, id) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.AddOTP(otp, id); });
    const findOtpUser = (userId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.findOtpUser(userId); });
    const deleteOtpUser = (userId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.deleteOtpUser(userId); });
    const updateVerifiedUser = (userId) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.updateVerifiedUser(userId); });
    const getAllUsers = (paginate) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.getAllUsers(paginate); });
    const updateVerificationCode = (email, verificationCode) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.updateVerificationCode(email, verificationCode); });
    const findVerificationCode = (verificationCode) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.findVerificationCode(verificationCode); });
    const verifyAndResetPassword = (verificationCode, password) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.findVerificationCodeAndUpdate(verificationCode, password); });
    const updateProfile = (userID, userData) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.updateUserInfo(userID, userData); });
    const countUsers = () => __awaiter(void 0, void 0, void 0, function* () { return yield repository.countUsers(); });
    const updateSubcription = (restaurant, user) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.updateSubcription(restaurant, user); });
    const isUserSubscribed = (user, restaurant) => __awaiter(void 0, void 0, void 0, function* () { return yield repository.isUserSubscribed(user, restaurant); });
    return {
        getUserbyEmail,
        getUserbyId,
        updateUserBlock,
        addUser,
        addWallet,
        getWalletByUseId,
        updateWallet,
        createTransaction,
        getTransactions,
        registerGoogleSignedUser,
        addOTP,
        findOtpUser,
        updateVerifiedUser,
        deleteOtpUser,
        getAllUsers,
        updateVerificationCode,
        findVerificationCode,
        verifyAndResetPassword,
        updateProfile,
        countUsers,
        updateSubcription,
        isUserSubscribed,
    };
};
exports.userDbRepository = userDbRepository;
