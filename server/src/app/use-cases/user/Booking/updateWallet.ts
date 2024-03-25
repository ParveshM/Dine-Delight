import transactionEntity from "../../../../entities/transactionEntity";
import { TransactionDataType } from "../../../../types/BookingInterface";
import { UserDbInterface } from "../../../interfaces/userDbRepository";

export const updateWallet = async (
  userId: string,
  transactionData: TransactionDataType,
  userRepository: ReturnType<UserDbInterface>
) => {
  const { newBalance, type, description } = transactionData;
  const balance = type === "Debit" ? -newBalance : newBalance;
  const updateWallet = await userRepository.updateWallet(userId, balance);

  if (updateWallet) {
    const transactionDetails = transactionEntity(
      updateWallet?._id,
      newBalance,
      type,
      description
    );
    const transaction = await userRepository.createTransaction(
      transactionDetails
    );
  }
};
