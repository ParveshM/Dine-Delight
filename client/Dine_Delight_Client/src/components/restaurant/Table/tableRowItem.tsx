import { useNavigate } from "react-router-dom";

type TableDataPropsType = {
  sl_no: number;
  _id: string;
  tableNumber: string;
  capacity: number;
  location: string;
};

const TableRowData: React.FC<TableDataPropsType> = ({
  sl_no,
  _id,
  tableNumber,
  capacity,
  location,
}) => {
  const navigate = useNavigate();

  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
      <td
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {sl_no}
      </td>
      <td className="px-6 py-4">{tableNumber}</td>
      <td className="px-6 py-4">{capacity}</td>
      <td className="px-6 py-4">{location}</td>
      <td className="px-6 py-4">
        <button
          className="py-2 px-5 rounded-md bg-green-400 text-white font-semibold hover:bg-green-500 transition duration-150"
          onClick={() => navigate(`/restaurant/view_table/${_id}`)}
        >
          View
        </button>
      </td>
    </tr>
  );
};

export default TableRowData;
