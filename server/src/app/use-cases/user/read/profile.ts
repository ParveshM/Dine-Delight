import { Types } from "mongoose";
import { UserDbInterface } from "../../../interfaces/userDbRepository";
import { UserInterface } from "../../../../types/userInterface";

export const getUserProfile = async (
  userID: string,
  userRepository: ReturnType<UserDbInterface>
) => {
  const user = await userRepository.getUserbyId(userID);
  const wallet = await userRepository.getWalletByUseId(userID);
  const walletId = wallet?._id as unknown as Types.ObjectId;
  const transactions = await userRepository.getTransactions(walletId);
  return { user, wallet, transactions };
};

export const updateUser = async (
  userID: string,
  updateData: UserInterface,
  userRepository: ReturnType<UserDbInterface>
) => await userRepository.updateProfile(userID, updateData);

export const WalletTransactions = async (
  userId: string,
  userRepository: ReturnType<UserDbInterface>
) => {
  const user = await userRepository.getUserbyId(userId);
  const walletId = user?.wallet as unknown as Types.ObjectId;
  return await userRepository.getTransactions(walletId);
};
