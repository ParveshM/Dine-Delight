import { Edit } from "lucide-react";
import { OrderInterface } from "../../types/UserInterface";
import { statusTextColor } from "../../utils/util";
import { useEffect, useState } from "react";
import { useSocket } from "../../redux/Context/SocketContext";
import { FiAlertCircle } from "react-icons/fi";
interface OrderDataProps extends OrderInterface {
  index: number;
  setShowModal: (isOpen: boolean) => void;
}
const OrderData: React.FC<OrderDataProps> = ({
  index,
  orderId,
  tableNumber,
  user,
  status,
  createdAt,
  orderItems,
  setShowModal,
}) => {
  const [orderAfterUpdate, setOrderAfterUpdate] =
    useState<OrderInterface | null>(null);
  const [hasNewItems, setHasNewItems] = useState(false);
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on("notify_updatedOrder", (order) => {
        setOrderAfterUpdate(order);
      });
    }
  }, []);

  useEffect(() => {
    if (orderAfterUpdate && orderItems) {
      if (
        orderAfterUpdate.orderId === orderId &&
        orderAfterUpdate.orderItems.length > orderItems.length
      ) {
        setHasNewItems(true);
      }
    }
  }, [orderAfterUpdate, orderItems]);

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {index}
      </td>
      <td className="px-6 py-4">{orderId}</td>
      <td className="px-6 py-4">{tableNumber}</td>
      <td className="px-6 py-4">{user.name}</td>
      <td className="px-6 py-4">
        {new Date(createdAt).toLocaleString("en-US", {
          year: "numeric",
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })}
      </td>

      <td className={`px-6 py-4 ${statusTextColor(status)}`}>{status}</td>
      <td className="px-6 py-4 flex gap-2 items-center">
        <div className="w-4">
          {hasNewItems && (
            <FiAlertCircle
              title="New items on order"
              className="text-yellow-500 hover:cursor-pointer"
              onClick={() => setHasNewItems(false)}
            />
          )}
        </div>
        <Edit
          className="text-orange-400 cursor-pointer"
          onClick={() => setShowModal(true)}
        />
      </td>
    </tr>
  );
};
export default OrderData;
