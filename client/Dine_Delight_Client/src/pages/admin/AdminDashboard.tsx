import {
  CalendarCheck,
  ChevronDown,
  CircleDollarSign,
  UsersRound,
  Utensils,
} from "lucide-react";
import useAdminDashboard from "../../hooks/useAdminDashboard";
import DashboardTableData from "../../components/Admin/DashboardTableData";
import Pagination from "../../components/Pagination";
import LineChart from "../../components/Admin/LineChart";
import DashboardCard from "../../components/Admin/DashboardCard";

const AdminDashboard: React.FC = () => {
  const {
    dashboardData,
    currentPage,
    itemsPerPage,
    bookings,
    setCurrentPage,
    setSelectedStatus,
    pageSize,
  } = useAdminDashboard();

  return (
    <div className="mt-4">
      <div className="grid grid-cols-12 gap-2 bg-gray-50 p-2 rounded-md">
        <DashboardCard
          Icon={<UsersRound className="w-5 h-5 text-yellow-500" />}
          label="Users"
          data={dashboardData?.totalUsers || 0}
          className="bg-yellow-100"
        />
        <DashboardCard
          Icon={<CalendarCheck className="w-5 h-5 text-blue-500" />}
          label=" Total bookings"
          data={dashboardData?.totalBookings || 0}
          className="bg-blue-100"
        />
        <DashboardCard
          Icon={<Utensils className="w-5 h-5 text-orange-500" />}
          label="Restaurants"
          data={dashboardData?.totalRestaurants || 0}
          className="bg-orange-100"
        />
        <DashboardCard
          Icon={<CircleDollarSign className="w-5 h-5 text-green-500" />}
          label="Total Profit"
          showPriceSymbol={true}
          data={dashboardData?.totalProfit || 0}
          className="bg-green-100"
        />
      </div>
      {/* Graph data  */}
      <div className="grid grid-cols-2 ">
        <div className="col-span-2  md:h-[400px]  rounded-lg">
          <LineChart data={dashboardData?.data} />
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-between px-2">
          <h2 className="text-2xl font-bold mb-4">Bookings</h2>
          <div className="relative">
            <select
              className="block appearance-none bg-white border border-gray-300 text-sm py-1 px-2 pr-8 rounded-md focus:outline-none focus:border-blue-500"
              onChange={(e) => setSelectedStatus(e.target.value)}
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
        </div>

        <div className=" overflow-x-auto shadow-md sm:rounded-lg min-h-28">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Restaurant name
                </th>
                <th scope="col" className="px-6 py-3">
                  BookingId
                </th>
                <th scope="col" className="px-6 py-3">
                  User name
                </th>
                <th scope="col" className="px-6 py-3">
                  Date
                </th>
                <th scope="col" className="px-6 py-3">
                  Time
                </th>
                <th scope="col" className="px-6 py-3">
                  Booking status
                </th>
              </tr>
            </thead>
            <tbody>
              {bookings.length ? (
                <>
                  {bookings.map((item) => (
                    <DashboardTableData {...item} key={item._id} />
                  ))}
                </>
              ) : (
                <tr>
                  <td>No booking found</td>
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
      </div>
    </div>
  );
};

export default AdminDashboard;
