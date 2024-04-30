import { useEffect, useState } from "react";
import { OrderInterface } from "../../../types/UserInterface";
import axiosJWT from "../../../utils/axiosService";
import { USER_API } from "../../../constants";
import showToast from "../../../utils/toaster";
import OrderList from "../../../components/user/Order/OrderList";

const RecentOrders = () => {
  const [orders, setOrders] = useState<OrderInterface[]>([]);

  useEffect(() => {
    axiosJWT
      .get(USER_API + "/orders")
      .then(({ data }) => setOrders(data.orders))
      .catch(() => showToast("Oops! Something went wrong", "error"));
  }, []);
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">Your Orders</h1>
      <div className="grid grid-cols-1  gap-6">
        {orders.map((order) => (
          <OrderList {...order} key={order._id} />
        ))}
      </div>
    </div>
  );
};

export default RecentOrders;
