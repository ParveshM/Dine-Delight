import ReservationTableData from "../../components/restaurant/ReservationTableData";
import { reservationTableColomns } from "../../constants";
import useReservations from "../../hooks/useReservations";

const Reservations = () => {
  const { bookings } = useReservations();

  if (!bookings.length)
    return <h1 className="mb-2 text-xl font-semibold ">No Reservations</h1>;
  return (
    <>
      <h1 className="mb-2 text-xl font-semibold ">Reservations</h1>
      <div className=" overflow-x-auto shadow-md sm:rounded-lg h-screen">
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
            {bookings.map((item) => (
              <ReservationTableData {...item} key={item._id} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Reservations;
