import React, { useState } from "react";
import { OrderInterface } from "../../../types/UserInterface";
import { statusTextColor } from "../../../utils/util";

const OrderList: React.FC<OrderInterface> = ({
  _id,
  orderId,
  status,
  total,
  orderItems,
  tableNumber,
}) => {
  const [toggleShowMore, setToggleShowMore] = useState<boolean>(false);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Order ID: {orderId}
      </h2>
      <p className={`${statusTextColor(status)} mb-4`}>
        <span className="font-bold text-black">Order Status:</span> {status}
      </p>
      <p className="text-gray-600 mb-4">Total: ₹{total}</p>
      <ul className="flex flex-col">
        {(toggleShowMore ? orderItems : orderItems.slice(0, 2)).map(
          (orderItem, index) => (
            <li
              key={index}
              className="flex items-center justify-between py-2 border-b"
            >
              <span className="flex-1">
                {orderItem.quantity}x {orderItem.item.name}
              </span>
              <span className="text-gray-700">₹{orderItem.price}</span>
            </li>
          )
        )}
      </ul>
      {orderItems.length > 2 && (
        <button
          className="text-blue-500 mt-2 hover:underline focus:outline-none"
          onClick={() => setToggleShowMore(!toggleShowMore)}
        >
          {toggleShowMore ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};

export default OrderList;
