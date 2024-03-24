import { Types } from "mongoose";

export default function transactionEntity(
  walletId: Types.ObjectId,
  amount: number,
  type: string,
  description: string
) {
  return {
    getWalletId: (): Types.ObjectId => walletId,
    getAmount: (): number => amount,
    getType: (): string => type,
    getDescription: (): string => description,
  };
}

export type TransactionEntityType = ReturnType<typeof transactionEntity>;
