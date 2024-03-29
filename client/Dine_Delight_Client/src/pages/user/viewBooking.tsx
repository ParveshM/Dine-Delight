import { useParams } from "react-router-dom";
import Button from "../../components/restaurant/Button";
import { useEffect, useState } from "react";
import axiosJWT from "../../utils/axiosService";
import { USER_API } from "../../constants";
import showToast from "../../utils/toaster";
import { BookingInterface } from "../../types/BookingInterface";
import { Building, Calendar, Clock, Users } from "lucide-react";
import { MdOutlineTableBar } from "react-icons/md";
import { MdOutlinePayment } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import { TbCircleXFilled } from "react-icons/tb";
import { RiRefund2Line } from "react-icons/ri";
import { statusTextColor } from "../../utils/util";
import CancelBookingModal from "../../components/user/Modals/cancelBookingModal";

const ViewBooking: React.FC = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState<BookingInterface | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  useEffect(() => {
    axiosJWT
      .get(USER_API + `/bookings/${id}`)
      .then(({ data }) => setBooking(data.bookingDetails))
      .catch(() => showToast("Oops! Something went wrong", "error"));
  }, []);

  const handleCancellation = () => {
    axiosJWT
      .patch(USER_API + `/booking/cancel/${booking?.bookingId}`)
      .then(({ data }) => {
        setBooking((prevBooking) => ({
          ...prevBooking!,
          bookingStatus:
            data.booking.bookingStatus ?? prevBooking?.bookingStatus,
        }));
      })
      .catch(() => showToast("Oops! Something went wrong", "error"));
    setIsOpen(false);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8 border rounded-lg shadow-md">
        <h1 className="text-center mb-4 text-2xl font-semibold">
          Booking Details
        </h1>
        <hr className="mt-2 h-0.5 border-t border-gray-300" />

        <div className="grid grid-cols-6 gap-4 ">
          <div className="col-span-6 md:col-span-3 p-4 space-y-3 mt-3">
            <div className="flex items-center gap-2">
              <Building />
              <p className="text-lg font-semibold ">
                {booking?.restaurantId.restaurantName}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Calendar />
              <p className="text-sm">
                {booking?.tableSlotId?.slotDate &&
                  new Date(booking.tableSlotId.slotDate).toLocaleDateString(
                    "en-us",
                    {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Clock />
              <p className="text-sm">
                {booking?.tableSlotId.startTime} -{" "}
                {booking?.tableSlotId.endTime}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <MdOutlineTableBar className="h-6 w-6" />
              <p className="text-sm">{booking?.tableId.tableNumber}</p>
            </div>
            <div className="flex items-center gap-2">
              <Users />
              <p className="text-sm">{booking?.tableId.capacity} Guests</p>
            </div>
          </div>
          <div className="col-span-6 md:col-span-3   p-4 space-y-2 mt-2">
            <div className="flex items-center gap-2">
              <MdOutlinePayment className="h-6 w-6" />
              <p className=" font-medium">{booking?.paymentMethod} Payment</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-lg font- ">Payment Status:</p>
              <p className="inline-flex gap-2 items-center font-medium">
                {booking?.paymentStatus}
                {booking?.paymentStatus === "Paid" ? (
                  <FaCircleCheck color="#2eff51" />
                ) : booking?.paymentStatus === "Failed" ? (
                  <TbCircleXFilled className="text-red-500" />
                ) : (
                  <RiRefund2Line className="text-blue-500" />
                )}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-lg font-medium ">Booking Status:</p>
              <p
                className={`font-semibold ${statusTextColor(
                  booking?.bookingStatus as string
                )}`}
              >
                {booking?.bookingStatus}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-lg font-medium ">GST:</p>
              <p className="text-sm">18%</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-lg font-semibold ">Amount Paid</p>
              <p className="text-base">₹{booking?.totalAmount}</p>
            </div>
          </div>
        </div>
        {booking?.bookingStatus && booking?.bookingStatus !== "Cancelled" && (
          <Button
            label="Cancel Booking"
            className="block mx-auto mt-8 bg-red-400 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
            handleButtonclick={() => setIsOpen(true)}
          />
        )}
      </div>
      {isOpen && (
        <CancelBookingModal
          setIsOpen={setIsOpen}
          handleCancellation={handleCancellation}
        />
      )}
    </>
  );
};

export default ViewBooking;
