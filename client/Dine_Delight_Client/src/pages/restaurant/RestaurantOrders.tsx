import { useEffect, useState } from "react";
import axiosJWT from "../../utils/axiosService";
import { RESTAURANT_API } from "../../constants";
import showToast from "../../utils/toaster";
import { OrderInterface } from "../../types/UserInterface";
import OrderData from "../../components/restaurant/OrderData";
import ViewOrder from "../../components/restaurant/ViewOrder";
import { useSocket } from "../../redux/Context/SocketContext";
import { useAppSelector } from "../../redux/store/Store";
import usePaginateState from "../../hooks/usePaginateState";
import Pagination from "../../components/Pagination";

const RestaurantOrders = () => {
  const [orders, setOrders] = useState<OrderInterface[]>([]);
  const [viewOrder, setViewOrder] = useState<OrderInterface | null>(null);
  const [viewOrderModal, setViewOrderModal] = useState<boolean>(false);
  const socket = useSocket();
  const user = useAppSelector((state) => state.UserSlice);

  const {
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    itemsPerPage,
    setItemsPerPage,
  } = usePaginateState();

  useEffect(() => {
    axiosJWT
      .get(RESTAURANT_API + "/orders", { params: { page: currentPage } })
      .then(({ data }) => {
        const { orders, count, limit } = data;
        setOrders(orders);
        setPageSize(count);
        setItemsPerPage(limit);
      })
      .catch(() => showToast("Oops! Something went wrong", "error"));
  }, [currentPage]);

  const handleUpdatedOrder = (orderData: OrderInterface) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order._id === orderData._id
          ? { ...order, status: orderData.status }
          : order
      )
    );
    setViewOrderModal(false);
  };

  useEffect(() => {
    if (socket) {
      socket?.emit("addUser", user.id);
      socket?.on("get_newOrder", (order) => {
        setOrders((prev) => [order, ...prev]);
      });
    }
  }, []);

  return (
    <>
      <h1 className="mb-2 text-xl font-semibold ">Orders</h1>
      <div className=" overflow-x-auto shadow-md sm:rounded-lg custom-vh">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                SL:no
              </th>
              <th scope="col" className="px-6 py-3">
                Order No
              </th>
              <th scope="col" className="px-6 py-3">
                Table no
              </th>
              <th scope="col" className="px-6 py-3">
                user
              </th>
              <th scope="col" className="px-6 py-3">
                date
              </th>
              <th scope="col" className="px-6 py-3">
                status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <OrderData
                {...order}
                key={order._id}
                index={index + 1}
                setShowModal={(isOpen) => {
                  setViewOrderModal(isOpen);
                  setViewOrder(order);
                }}
              />
            ))}
          </tbody>
        </table>
        {viewOrderModal && viewOrder && (
          <ViewOrder
            setIsModalOpen={setViewOrderModal}
            order={viewOrder}
            handleUpdateOrder={handleUpdatedOrder}
          />
        )}
        <Pagination
          currentPage={currentPage}
          totalCount={pageSize}
          itemsPerPage={itemsPerPage} //items per page
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </>
  );
};

export default RestaurantOrders;
