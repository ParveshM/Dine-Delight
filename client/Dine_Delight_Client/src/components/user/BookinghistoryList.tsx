import { Link, useNavigate } from "react-router-dom";
import { BookingInterface } from "../../types/BookingInterface";
import { statusTextColor, timeAgo } from "../../utils/util";
import { Calendar, Users } from "lucide-react";

const BookingHistoryList: React.FC<BookingInterface> = ({
  bookingId,
  bookingStatus,
  restaurantId,
  tableId,
  createdAt,
}) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-start items-start mt-2 dark:bg-gray-800 rounded-lg bg-gray-50 px-4  w-full">
      <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
        <div className="pb-4 md:pb-8 w-full md:w-40">
          <Link to={`/view_restaurant/${restaurantId._id}`}>
            <img
              className="w-full md:w-80 md:h-24 rounded-lg"
              src={restaurantId.primaryImage}
              alt={restaurantId.restaurantName}
            />
          </Link>
        </div>
        <div
          className="border-b border-gray-200 hover:cursor-pointer
         md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0"
          onClick={() => navigate(`/booking/view/${bookingId}`)}
        >
          <div className="w-full flex flex-col justify-start items-start space-y-2">
            <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
              {restaurantId.restaurantName}
            </h3>
            <div className="flex justify-start items-start flex-col space-y-3">
              <p
                className={`text-sm font-semibold leading-none ${statusTextColor(
                  bookingStatus
                )}`}
              >
                {bookingStatus}
              </p>
              <p className="text-sm inline-flex items-center gap-2 dark:text-white leading-none text-gray-800">
                <Users />
                {tableId.capacity} guests
              </p>
              <p className="text-sm inline-flex items-center gap-2 dark:text-white leading-none text-gray-800">
                <Calendar />
                {new Date(createdAt).toLocaleDateString("en-IN", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
          <div className="flex justify-between space-x-8 items-start w-full">
            <p className="text-base dark:text-white xl:text-lg leading-6">
              {" "}
              <span className="text-red-300 line-through"> {""}</span>
            </p>
            <p className="text-base dark:text-white xl:text-lg leading-6 text-gray-800">
              {" "}
            </p>
            <p className="text-sm  dark:text-white   leading-6 text-slate-500">
              {timeAgo(createdAt)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingHistoryList;
