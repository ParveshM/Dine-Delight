import { statusTextColor } from "../../utils/util";
import { Calendar, Users } from "lucide-react";

const BookingHistoryList: React.FC = ({}) => {
  return (
    <div className="flex flex-col justify-start items-start mt-2 dark:bg-gray-800 rounded-lg bg-gray-50 px-4  w-full">
      <div className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
        <div className="pb-4 md:pb-8 w-full md:w-40">
          <img
            className="w-28 rounded-lg"
            src="https://i.ibb.co/84qQR4p/Rectangle-10.png"
            alt="dress"
          />
        </div>
        <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
          <div className="w-full flex flex-col justify-start items-start space-y-2">
            <h3 className="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
              Restaurant Name
            </h3>
            <div className="flex justify-start items-start flex-col space-y-3">
              <p
                className={`text-sm font-semibold leading-none ${statusTextColor(
                  "Confirmed"
                )}`}
              >
                Italic Minimal Design
              </p>
              <p className="text-sm inline-flex items-center gap-2 dark:text-white leading-none text-gray-800">
                <Users />
                Italic Minimal Design
              </p>
              <p className="text-sm inline-flex items-center gap-2 dark:text-white leading-none text-gray-800">
                <Calendar />
                Italic Minimal Design
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
              2 days ago
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingHistoryList;
