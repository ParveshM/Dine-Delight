import { UserRepositoryMongodbType } from "../../frameworks/database/mongodb/repositories/userRepositoryMongodb";
import {
  googleSignInUserEntityType,
  userEntityType,
} from "../../entities/userEntity";
import { TransactionEntityType } from "../../entities/transactionEntity";
import { Types } from "mongoose";
import { UserInterface } from "../../types/userInterface";

// Interface for the database repository that we need to use
/*
 * User db repository interfaces
 */

export const userDbRepository = (
  repository: ReturnType<UserRepositoryMongodbType>
) => {
  const getUserbyEmail = async (email: string) =>
    await repository.getUserbyEmail(email);

  const getUserbyId = async (id: string) => await repository.getUserbyId(id);

  const updateUserBlock = async (id: string, status: boolean) =>
    await repository.updateUserBlock(id, status);

  const addUser = async (user: userEntityType) =>
    await repository.addUser(user);

  const addWallet = async (userID: string) =>
    await repository.addWallet(userID);

  const getWalletByUseId = async (userId: string) =>
    await repository.getWalletByUseId(userId);

  const updateWallet = async (userId: string, newBalance: number) =>
    await repository.updateWallet(userId, newBalance);

  const createTransaction = async (transactionDetails: TransactionEntityType) =>
    await repository.createTransaction(transactionDetails);

  const getTransactions = async (walletId: Types.ObjectId) =>
    await repository.allTransactions(walletId);

  const registerGoogleSignedUser = async (user: googleSignInUserEntityType) =>
    await repository.registerGoogleSignedUser(user);

  const addOTP = async (otp: string, id: string) =>
    await repository.AddOTP(otp, id);

  const findOtpUser = async (userId: string) =>
    await repository.findOtpUser(userId);

  const deleteOtpUser = async (userId: string) =>
    await repository.deleteOtpUser(userId);

  const updateVerifiedUser = async (userId: string) =>
    await repository.updateVerifiedUser(userId);

  const getAllUsers = async () => await repository.getAllUsers();

  const updateVerificationCode = async (
    email: string,
    verificationCode: string
  ) => await repository.updateVerificationCode(email, verificationCode);

  const findVerificationCode = async (verificationCode: string) =>
    await repository.findVerificationCode(verificationCode);

  const verifyAndResetPassword = async (
    verificationCode: string,
    password: string
  ) =>
    await repository.findVerificationCodeAndUpdate(verificationCode, password);

  const updateProfile = async (userID: string, userData: Record<string, any>) =>
    await repository.updateUserInfo(userID, userData);

  const countUsers = async () => await repository.countUsers();

  const updateBookmarks = async (
    userID: string,
    bookmarksData: Record<string, any>
  ) => await repository.updateBookmarks(userID, bookmarksData);

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
    updateBookmarks,
  };
};

export type UserDbInterface = typeof userDbRepository;
