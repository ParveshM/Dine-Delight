import {
  CalendarCheck,
  ChevronDown,
  CircleDollarSign,
  Utensils,
} from "lucide-react";
import useAdminDashboard from "../../hooks/useAdminDashboard";
import DashboardTableData from "../../components/Admin/DashboardTableData";
import Pagination from "../../components/Pagination";

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
        <div className="col-span-6 md:col-span-3 ">
          <div className=" h-full flex items-center p-4 bg-white rounded-lg shadow-md ">
            <div className="p-3 mr-4 text-yellow-500 bg-yellow-100 rounded-full">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z"></path>
              </svg>
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600">Users</p>
              <p className="text-lg font-semibold text-gray-700">
                {dashboardData?.totalUsers}
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-6 md:col-span-3 ">
          <div className=" h-full flex items-center p-4 bg-white rounded-lg shadow-md ">
            <div className="p-3 mr-4 bg-blue-100 rounded-full">
              <CalendarCheck className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600">
                Total bookings
              </p>
              <p className="text-lg font-semibold text-gray-700">
                {dashboardData?.totalBookings}
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-6 md:col-span-3 ">
          <div className=" h-full flex items-center p-4 bg-white rounded-lg shadow-md ">
            <div className="p-3 mr-4 bg-orange-100 rounded-full">
              <Utensils className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600 ">
                Restaurants
              </p>
              <p className="text-lg font-semibold text-gray-700">
                {dashboardData?.totalRestaurants}
              </p>
            </div>
          </div>
        </div>
        <div className="col-span-6 md:col-span-3 ">
          <div className=" h-full flex items-center p-4 bg-white rounded-lg shadow-md ">
            <div className="p-3 mr-4 bg-green-100 rounded-full">
              <CircleDollarSign className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="mb-2 text-sm font-medium text-gray-600">
                Total Profit
              </p>
              <p className="text-lg font-semibold text-gray-700">
                ₹ {dashboardData?.totalProfit}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="grid grid-cols-2 gap-4 mt-8">
        <div className="col-span-2 md:col-span-1 bg-blue-200 p-4">Graph 1</div>
        <div className="col-span-2 md:col-span-1 bg-blue-200 p-4">Graph 2</div>
      </div> */}

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
                <h2>No booking found</h2>
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
