import { IoClose } from "react-icons/io5";
import { OrderInterface } from "../../types/UserInterface";
import { ChevronDown } from "lucide-react";
import { FormEvent, useState } from "react";
import axiosJWT from "../../utils/axiosService";
import { RESTAURANT_API } from "../../constants";
import showToast from "../../utils/toaster";

interface ViewOrderProps {
  order: OrderInterface;
  setIsModalOpen: (isOpen: boolean) => void;
  handleUpdateOrder: (order: OrderInterface) => void;
}
const ViewOrder: React.FC<ViewOrderProps> = ({
  setIsModalOpen,
  order,
  handleUpdateOrder,
}) => {
  const [status, setStatus] = useState<string>(order.status);
  const handleSubmit = (e: FormEvent<HTMLElement>) => {
    e.preventDefault();
    axiosJWT
      .patch(RESTAURANT_API + `/orders/${order.orderId}`, {
        status,
      })
      .then(({ data }) => {
        showToast(data.message);
        handleUpdateOrder(data.order);
      })
      .catch(() => showToast("Oops! Something went wrong", "error"));
  };
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto  bg-gray-500 bg-opacity-50 flex justify-center items-center ">
      <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full mx-3">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900 inline-flex items-center gap-2">
            Update order
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto flex justify-center items-center"
            onClick={() => setIsModalOpen(false)}
          >
            <IoClose className="w-4 h-4" />
          </button>
        </div>
        <form className="p-4 md:p-5" onSubmit={handleSubmit}>
          <div className="grid gap-4 mb-4 grid-cols-4">
            <div className="col-span-4 md:col-span-2 bg-white dark:bg-gray-800">
              <h3 className="text-lg font-semibold mb-2">Order Details</h3>

              <div className="space-y-2">
                <div>
                  <p className="text-sm font-semibold">Order ID:</p>
                  <p className="text-sm">{order.orderId}</p>
                </div>
                <p className="text-sm font-semibold">Table Number :</p>
                <div className="text-sm flex items-center gap-2">
                  <p>{order.tableNumber}</p>
                </div>
                <div className="flex items-center">
                  <p className="text-sm font-semibold mr-2">Order Status:</p>
                  <div className="relative">
                    <select
                      className="block appearance-none bg-white border border-gray-300 text-sm py-1 px-2 pr-8 rounded-md focus:outline-none focus:border-blue-500"
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      {order.status === "Cancelled" ? (
                        <option value="Cancelled">Cancelled</option>
                      ) : (
                        <>
                          <option value="Pending">Pending</option>
                          <option value="Confirmed">Confirmed</option>
                          <option value="InProgress">In progress</option>
                          <option value="Completed">Completed</option>
                          <option value="Cancelled">Cancelled</option>
                        </>
                      )}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <ChevronDown />
                    </div>
                  </div>
                </div>

                <p className="text-sm font-semibold">name:</p>
                <p className="text-sm">{order.user.name}</p>
                <p className="text-sm font-semibold">Mobile</p>
                <p className="text-sm">{order.mobile}</p>
              </div>
            </div>
            <div className="col-span-4  md:col-span-2 ">
              <ul className="flex flex-col h-20 md:h-56 overflow-y-auto my-2 px-2">
                {order.orderItems.map((orderItem, index) => (
                  <li
                    key={index}
                    className="flex items-center justify-between py-2 border-b"
                  >
                    <span className="flex-1">
                      {orderItem.quantity}x {orderItem.item.name}
                    </span>
                    <span className="text-gray-700">₹{orderItem.price}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 font-medium text-base">
                Total : ₹{order.total}
              </p>
            </div>
          </div>

          <button
            className="text-white   bg-green-500 hover:bg-green-600
         focus:ring-green-400 focus:ring-2 focus:outline-none  font-medium rounded-lg
         text-sm px-5 py-2.5 text-center"
            type="submit"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};
export default ViewOrder;
