import { Edit } from "lucide-react";
import { BookingInterface } from "../../types/BookingInterface";
import { statusTextColor } from "../../utils/util";
import { useNavigate } from "react-router-dom";

const ReservationTableData: React.FC<BookingInterface> = ({
  bookingId,
  bookingStatus,
  userId,
  tableId,
  tableSlotId,
}) => {
  const navigate = useNavigate();
  return (
    <tr
      className={` ${
        bookingStatus === "Checked-in" ? "bg-orange-100" : "bg-white"
      } border-b border-orange-300 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600`}
    >
      <td className="px-6 py-4">{bookingId.substring(0, 12) + ".."}</td>
      <td className="px-6 py-4">{userId.name}</td>
      <td className="px-6 py-4">{tableSlotId.startTime}</td>
      <td className="px-6 py-4">
        {new Date(tableSlotId.slotDate).toLocaleDateString("en-IN", {
          day: "numeric",
          month: "numeric",
          year: "numeric",
        })}
      </td>
      <td className="px-6 py-4">{tableId.capacity}</td>
      <td className={`px-6 py-4 font-medium ${statusTextColor(bookingStatus)}`}>
        {bookingStatus}
      </td>
      <td className="px-6 py-4">
        <Edit
          className="text-orange-400 cursor-pointer"
          onClick={() => navigate(`/restaurant/reservations/view/${bookingId}`)}
        />
      </td>
    </tr>
  );
};

export default ReservationTableData;
