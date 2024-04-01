import React, { useEffect, useState } from "react";
import { TransactionsInterface } from "../../types/UserInterface";
import axiosJWT from "../../utils/axiosService";
import { USER_API } from "../../constants";
import showToast from "../../utils/toaster";

const TransactionHistory: React.FC = () => {
  const [transactions, setTransactions] = useState<TransactionsInterface[]>([]);

  useEffect(() => {
    axiosJWT
      .get(USER_API + "/transactions")
      .then(({ data }) => setTransactions(data.transaction))
      .catch(() => showToast("Oops! Something went wrong", "error"));
  }, []);
  return (
    <div className="container mx-auto ">
      {transactions.length ? (
        <>
          <h1 className="text-3xl font-semibold mb-6">Transaction History</h1>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="px-4 py-2 text-left">Date</th>
                  <th className="px-4 py-2 text-left">Transaction Type</th>
                  <th className="px-4 py-2 text-left">Description</th>
                  <th className="px-4 py-2 text-left">Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr
                    key={transaction._id}
                    className="hover:bg-gray-100 transition-colors duration-200"
                  >
                    <td className="border px-4 py-2">
                      {transaction.createdAt &&
                        new Date(transaction.createdAt).toLocaleDateString(
                          "en-us",
                          {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                    </td>
                    <td className="border px-4 py-2 capitalize">
                      {transaction.type}
                    </td>
                    <td className="border px-4 py-2">
                      {transaction.description}
                    </td>
                    <td className="border px-4 py-2">
                      <div
                        className={`text-sm font-semibold ${
                          transaction.type === "Credit"
                            ? "text-green-600"
                            : "text-red-600"
                        }`}
                      >
                        {transaction.type === "Credit" ? `+` : `-`}
                        {transaction.amount}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-semibold mb-4">No transactions yet</h1>
          <img
            src="https://cdn.dribbble.com/users/8925263/screenshots/16869159/media/bd048f9ae4c3c4f005bffd1612d85bb3.png"
            alt="No transactions"
            className="sm:w-64 sm:"
          />
        </div>
      )}
    </div>
  );
};

export default TransactionHistory;
