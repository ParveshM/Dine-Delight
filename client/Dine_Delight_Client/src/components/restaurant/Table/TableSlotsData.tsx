import { Trash } from "lucide-react";
import { TableSlotInterface } from "../../../types/RestaurantInterface";

interface TableSlotDataaPropsType extends TableSlotInterface {
  sl_no: number | null;
  handleDeleteSlot: (_id: string) => void;
}

const TableSlotsData: React.FC<TableSlotDataaPropsType> = ({
  sl_no,
  _id,
  slotDate,
  startTime,
  endTime,
  isAvailable,
  handleDeleteSlot,
}) => {
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {sl_no}
      </td>
      <td className="px-6 py-4">
        {slotDate &&
          new Date(slotDate).toLocaleDateString("en-us", {
            day: "numeric",
            month: "numeric",
            year: "numeric",
          })}
      </td>
      <td className="px-6 py-4">
        {startTime} - {endTime}
      </td>
      <td className="px-6 py-4">{isAvailable ? "Yes" : "No"}</td>

      <td className="px-6 py-4 inline-flex gap-2">
        {isAvailable ? ( //Show the delete button only when the slot is available
          <>
            <button
              className="p-1 rounded-md bg-red-400 text-white font-semibold hover:bg-red-500 transition duration-150"
              onClick={() => handleDeleteSlot(_id ?? "")}
            >
              <Trash />
            </button>
          </>
        ) : null}
      </td>
    </tr>
  );
};

export default TableSlotsData;
