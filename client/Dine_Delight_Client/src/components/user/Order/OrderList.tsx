import React, { useMemo, useState } from "react";
import { OrderInterface } from "../../../types/UserInterface";
import { statusTextColor } from "../../../utils/util";
import { useNavigate } from "react-router-dom";

const OrderList: React.FC<OrderInterface> = ({
  orderId,
  status,
  orderItems,
  tableNumber,
  restaurant,
}) => {
  const [toggleShowMore, setToggleShowMore] = useState<boolean>(false);
  const navigate = useNavigate();

  const orderTotal = useMemo(() => {
    return orderItems.reduce((acc, curr) => {
      return (acc += curr.price * curr.quantity);
    }, 0);
  }, [orderItems]);

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Order ID: {orderId}
      </h2>
      <p className={` mb-4`}>
        <span className="font-bold text-black">Table Number:</span>{" "}
        {tableNumber}
      </p>
      <p className={`${statusTextColor(status)} mb-4`}>
        <span className="font-bold text-black">Order Status:</span> {status}
      </p>
      <p className="text-gray-600 mb-4">Total: ₹{orderTotal}</p>
      <ul className="flex flex-col">
        {(toggleShowMore ? orderItems : orderItems.slice(0, 4)).map(
          (orderItem, index) => (
            <li
              key={index}
              className="flex items-center justify-between py-2 border-b last:border-b-0"
            >
              <span className="flex-1">
                {orderItem.quantity}x {orderItem.item.name}
              </span>
              <span className="text-gray-700">₹{orderItem.price}</span>
            </li>
          )
        )}
      </ul>
      {orderItems.length > 4 && (
        <button
          className="text-blue-500 mt-2 hover:underline focus:outline-none"
          onClick={() => setToggleShowMore(!toggleShowMore)}
        >
          {toggleShowMore ? "Show Less" : "Show More"}
        </button>
      )}
      {status !== "Completed" && status !== "Cancelled" && (
        <div className="flex justify-end mt-3">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => navigate(`/menu/${restaurant}?orderId=${orderId}`)}
          >
            Order more?
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderList;
