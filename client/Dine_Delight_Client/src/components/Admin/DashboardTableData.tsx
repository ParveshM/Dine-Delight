import { BookingInterface } from "../../types/BookingInterface";
import { statusTextColor } from "../../utils/util";

const DashboardTableData: React.FC<BookingInterface> = ({
  restaurantId,
  userId,
  tableSlotId,
  bookingId,
  bookingStatus,
}) => {
  return (
    <tr className="dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td className="px-6 py-4">{restaurantId.restaurantName}</td>
      <td className="px-6 py-4">{bookingId?.substring(0, 12) + ".."}</td>
      <td className="px-6 py-4">{userId?.name ?? "John"}</td>
      <td className="px-6 py-4">
        {tableSlotId?.slotDate &&
          new Date(tableSlotId.slotDate).toLocaleDateString("en-IN", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
          })}
      </td>
      <td className="px-6 py-4">
        {tableSlotId.startTime} - {tableSlotId.endTime}
      </td>
      <td
        className={`px-6 py-4 ${
          bookingStatus && statusTextColor(bookingStatus)
        }`}
      >
        {bookingStatus}
      </td>
    </tr>
  );
};

export default DashboardTableData;
