import { Edit } from "lucide-react";
import { OrderInterface } from "../../types/UserInterface";
import { statusTextColor } from "../../utils/util";

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
  setShowModal,
}) => {
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
      <td className="px-6 py-4">
        <Edit
          className="text-orange-400 cursor-pointer"
          onClick={() => setShowModal(true)}
        />
      </td>
    </tr>
  );
};
export default OrderData;
