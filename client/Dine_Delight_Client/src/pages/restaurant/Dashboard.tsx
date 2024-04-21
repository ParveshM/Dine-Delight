import { RESTAURANT_API, reservationTableColomns } from "../../constants";
import axiosJWT from "../../utils/axiosService";
import { useEffect, useState } from "react";
import { BookingInterface } from "../../types/BookingInterface";
import showToast from "../../utils/toaster";
import BarChart from "../../components/Admin/Graph/BarChart";
import PieChart from "../../components/Admin/Graph/PieChart";
import { GraphData, bookingStatisticsInterface } from "../../types/PropsType";
import Button from "../../components/restaurant/Button";
import ReservationTableData from "../../components/restaurant/ReservationTableData";
import ReportModal from "../../components/Admin/ReportModal";

const Dashboard = () => {
  const [graphData, setgraphData] = useState<GraphData[]>([]);
  const [bookingStatistics, setbookingStatistics] = useState<
    bookingStatisticsInterface[]
  >([]);
  const [bookings, setBookings] = useState<BookingInterface[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  useEffect(() => {
    axiosJWT
      .get(RESTAURANT_API + "/dashboard")
      .then(({ data }) => {
        const { graphData, bookings, bookingStatistics } = data;
        setgraphData(graphData);
        setBookings(bookings);
        setbookingStatistics(bookingStatistics);
      })
      .catch(() => {
        showToast("Oops! Something went wrong", "error");
      });
  }, []);
  return (
    <div>
      <div className="flex justify-between mb-2">
        <h1 className="text-2xl   font-bold">Dashboard</h1>
        <Button
          label="Create Report"
          className="bg-green-600 hover:bg-green-700 "
          handleButtonclick={() => setIsModalOpen(true)}
        />
      </div>
      <div className="grid grid-cols-2 gap-5 place-content-around bg-gray-50 rounded-md ">
        <div className="col-span-2 md:col-span-1   md:h-[400px]  rounded-lg flex justify-center items-center">
          <BarChart data={graphData} />
        </div>
        <div className="col-span-2 md:col-span-1 md:h-[400px] rounded-lg flex justify-center items-center">
          <PieChart data={bookingStatistics} />
        </div>
      </div>

      <div className="mt-8 py-2">
        <div className="flex justify-between px-2">
          <h2 className="text-2xl font-bold mb-4">Recent Bookings</h2>
        </div>
        <div className=" overflow-x-auto shadow-md sm:rounded-lg min-h-28  ">
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
                  <td>No booking found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {isModalOpen && <ReportModal isModalOpen={setIsModalOpen} />}
    </div>
  );
};

export default Dashboard;
