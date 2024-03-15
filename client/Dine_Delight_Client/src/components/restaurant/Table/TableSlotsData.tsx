import { Edit, Trash } from "lucide-react";

type TableSlotDataaPropsType = {
  sl_no: number;
  _id: string;
  slotDate: Date;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
};

const TableSlotsData: React.FC<TableSlotDataaPropsType> = ({
  sl_no,
  _id,
  slotDate,
  startTime,
  endTime,
  isAvailable,
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
        {new Date(slotDate).toLocaleDateString("en-us", {
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
        <button
          className="p-1 rounded-md bg-sky-400 text-white font-semibold hover:bg-sky-500 transition duration-150"
          onClick={() => console.log("")}
        >
          <Edit />
        </button>
        {isAvailable && ( //Show the delete button only when the slot is available
          <button
            className="p-1 rounded-md bg-red-400 text-white font-semibold hover:bg-red-500 transition duration-150"
            onClick={() => console.log("")}
          >
            <Trash />
          </button>
        )}
      </td>
    </tr>
  );
};

export default TableSlotsData;
