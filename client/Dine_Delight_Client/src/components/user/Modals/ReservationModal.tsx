import { useEffect, useState } from "react";
import {
  RestaurantInterface,
  TableInterface,
  TableSlotInterface,
} from "../../../types/RestaurantInterface";
import axios from "axios";
import { USER_API } from "../../../constants";
import { CalendarCheck2, Clock, Users } from "lucide-react";
import { useAppDispatch, useAppSelector } from "../../../redux/store/Store";
import { Link, useNavigate } from "react-router-dom";
import { setTableSlot } from "../../../redux/slices/BookingSlice";

interface ReserveModalProps {
  setIsModalOpen: (isOpen: boolean) => void;
  selectedSlot: TableSlotInterface | null;
  restaurant: RestaurantInterface;
}

const ReservationModal: React.FC<ReserveModalProps> = ({
  setIsModalOpen,
  selectedSlot,
  restaurant,
}) => {
  const isAuthenticated = useAppSelector(
    (state) => state.UserSlice.isAuthenticated
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [tableData, setTableData] = useState<TableInterface | null>(null);

  useEffect(() => {
    axios
      .get(USER_API + `/tables/${selectedSlot?.tableId}`)
      .then(({ data }) => setTableData(data.tableData))
      .catch(() => console.log("Error"));
  }, []);

  const handleConfirmReservation = () => {
    if (selectedSlot) {
      dispatch(setTableSlot(selectedSlot));
      navigate("/reserve_table");
    }
  };

  const formattedDate = selectedSlot?.slotDate
    ? new Date(selectedSlot.slotDate).toLocaleDateString("en-us", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  return (
    <div
      tabIndex={-1}
      aria-hidden="true"
      className="fixed inset-0 z-50  overflow-y-auto bg-gray-500 bg-opacity-50 flex justify-center items-center "
    >
      <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full mx-3 sm:top-7">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-semibold text-gray-900 inline-flex items-center gap-2">
            Complete your Reservation
          </h3>
          <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto flex justify-center items-center"
            onClick={() => setIsModalOpen(false)}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
        </div>
        <form className="p-4 md:p-5">
          <div className="grid gap-4 mb-4 grid-cols-4">
            <div className="col-span-4 font-bold text-3xl">
              {restaurant.restaurantName}
            </div>
            <div className="col-span-4 flex gap-2">
              <CalendarCheck2 />
              <p>{formattedDate}</p>
            </div>
            <div className="col-span-4 flex gap-2">
              <Clock />
              <p>
                {selectedSlot?.startTime} - {selectedSlot?.endTime}
              </p>
            </div>
            <div className="col-span-4 flex gap-2">
              <Users />
              <p>{tableData?.capacity} guests</p>
            </div>
          </div>

          {isAuthenticated ? (
            <button
              className="text-white w-full  bg-green-500 hover:bg-green-600
            focus:ring-green-400 focus:ring-2 focus:outline-none  font-medium rounded-lg
            text-sm px-5 py-2.5 text-center "
              type="button"
              onClick={handleConfirmReservation}
            >
              Confirm Reservation
            </button>
          ) : (
            <Link
              to="/user/auth/login"
              className="text-white w-full  bg-red-500 hover:bg-red-600
          focus:ring-red-400 focus:ring-2 focus:outline-none  font-medium rounded-lg
          text-sm px-5 py-2.5 text-center"
            >
              Login
            </Link>
          )}
        </form>
      </div>
    </div>
  );
};

export default ReservationModal;
