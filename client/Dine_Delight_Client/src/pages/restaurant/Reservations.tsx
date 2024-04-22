import { ChevronDown } from "lucide-react";
import ReservationTableData from "../../components/restaurant/ReservationTableData";
import { reservationTableColomns } from "../../constants";
import useReservations from "../../hooks/useReservations";
import Pagination from "../../components/Pagination";

const Reservations = () => {
  const {
    bookings,
    setSelectedStatus,
    itemsPerPage,
    pageSize,
    currentPage,
    setCurrentPage,
  } = useReservations();

  return (
    <>
      <h1 className="mb-2 text-xl font-semibold ">Reservations</h1>
      <div className="relative flex justify-end mb-2">
        <select
          className="block appearance-none bg-white border border-gray-300 text-sm py-1 px-2 pr-8 rounded-md focus:outline-none focus:border-blue-500"
          onChange={(e) => {
            setSelectedStatus(e.target.value);
            setCurrentPage(1);
          }}
          defaultValue=""
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="Confirmed">Confirmed</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Checked-in">Checked-in</option>
          <option value="No-show">No-show</option>
          <option value="Completed">Completed</option>
        </select>
        <div className="absolute top-1 right-0 flex items-center px-2 pointer-events-none">
          <ChevronDown />
        </div>
      </div>
      <div className=" overflow-x-auto shadow-md sm:rounded-lg custom-vh">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {reservationTableColomns.map((column) => (
                <th key={column.key} scope="col" className="px-6 py-3">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bookings.length ? (
              <>
                {bookings.map((item) => (
                  <ReservationTableData {...item} key={item._id} />
                ))}
              </>
            ) : (
              <tr>
                <td className=" text-xl font-semibold  text-center mt-2 ">
                  No Reservations
                </td>
              </tr>
            )}
          </tbody>
        </table>
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

export default Reservations;
