import {
  googleSignInUserEntityType,
  userEntityType,
} from "../../../../entities/userEntity";
import { UserInterface } from "../../../../types/userInterface";
import User from "../models/user";
import OTPModel from "../models/OTPmodel";
import wallet from "../models/wallet";
import Transactions from "../models/transactions";
import { TransactionEntityType } from "../../../../entities/transactionEntity";
import { Types } from "mongoose";
import { PaginateInterface } from "../../../../types/restaurantInterface";
import EmailSubscription from "../models/EmailSubscription";

export const userRepositoryMongodb = () => {
  const getUserbyEmail = async (email: string) => {
    const user: UserInterface | null = await User.findOne({ email }); // get the user with email
    return user;
  };

  const getUserbyId = async (id: string) =>
    await User.findById(id)
      .populate(["wallet", "bookmarks"])
      .select(["-password"]);

  const updateUserBlock = async (id: string, status: boolean) =>
    await User.findByIdAndUpdate(id, { isBlocked: status });

  //   create new user by matching the entity type
  const addUser = async (user: userEntityType) => {
    const newUser: any = new User({
      name: user.name(),
      email: user.getEmail(),
      password: user.getPassword(),
    });
    await newUser.save();
    return newUser;
  };
  const addWallet = async (userId: string) => await wallet.create({ userId });
  const updateWallet = async (userId: string, newBalance: number) =>
    await wallet.findOneAndUpdate(
      { userId },
      { $inc: { balance: newBalance } }
    );

  const getWalletByUseId = async (userId: string) =>
    await wallet.findOne({ userId });

  const createTransaction = async (transactionDetails: TransactionEntityType) =>
    await Transactions.create({
      walletId: transactionDetails.getWalletId(),
      type: transactionDetails.getType(),
      description: transactionDetails.getDescription(),
      amount: transactionDetails.getAmount(),
    });

  const allTransactions = async (walletId: Types.ObjectId) =>
    await Transactions.find({ walletId }).sort({ createdAt: -1 });

  const registerGoogleSignedUser = async (user: googleSignInUserEntityType) =>
    await User.create({
      name: user.name(),
      email: user.email(),
      profilePicture: user.picture(),
      isVerified: user.email_verified(),
    });

  const AddOTP = async (OTP: string, userId: string) => {
    await OTPModel.create({ OTP, userId });
  };

  const findOtpUser = async (userId: string) =>
    await OTPModel.findOne({ userId });

  const deleteOtpUser = async (userId: string) =>
    await OTPModel.deleteOne({ userId });

  const updateVerifiedUser = async (userId: string) =>
    await User.findByIdAndUpdate(userId, { isVerified: true });

  const updateVerificationCode = async (email: string, code: string) =>
    await User.findOneAndUpdate({ email }, { verificationCode: code });

  const findVerificationCode = async (verificationCode: string) =>
    await User.findOneAndUpdate({ verificationCode });

  const findVerificationCodeAndUpdate = async (
    code: string,
    newPassword: string
  ) =>
    await User.findOneAndUpdate(
      { verificationCode: code },
      { password: newPassword, verificationCode: null },
      { upsert: true }
    );

  const getAllUsers = async (paginate: PaginateInterface) => {
    const users = await User.find({ isVerified: true })
      .skip(paginate.skip)
      .limit(paginate.limit);
    const count = await User.countDocuments({ isVerified: true });
    return { users, count };
  };
  const updateUserInfo = async (id: string, updateData: Record<string, any>) =>
    await User.findByIdAndUpdate(id, updateData, { new: true });

  const countUsers = async () =>
    await User.countDocuments({ isVerified: true });

  const updateSubcription = async (restaurant: string, user: string) =>
    await EmailSubscription.create({ restaurant, user, isSubscribed: false });

  const isUserSubscribed = async (user: string, restaurant: string) =>
    await EmailSubscription.findOne({ user, restaurant });

  // exporting the functions
  return {
    getUserbyEmail,
    getUserbyId,
    addUser,
    addWallet,
    getWalletByUseId,
    updateWallet,
    createTransaction,
    allTransactions,
    registerGoogleSignedUser,
    AddOTP,
    findOtpUser,
    updateVerifiedUser,
    deleteOtpUser,
    getAllUsers,
    updateUserBlock,
    updateVerificationCode,
    findVerificationCode,
    findVerificationCodeAndUpdate,
    updateUserInfo,
    countUsers,
    updateSubcription,
    isUserSubscribed,
  };
};

// exporting the type to match the repostory function types
export type UserRepositoryMongodbType = typeof userRepositoryMongodb;
