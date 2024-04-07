import { useNavigate, useParams } from "react-router-dom";
import Button from "../../components/restaurant/Button";
import { useEffect, useMemo, useState } from "react";
import axiosJWT from "../../utils/axiosService";
import { CHAT_API, USER_API } from "../../constants";
import showToast from "../../utils/toaster";
import { BookingInterface } from "../../types/BookingInterface";
import { Building, Calendar, Clock, Hash, Users } from "lucide-react";
import { MdOutlineTableBar } from "react-icons/md";
import { MdOutlinePayment } from "react-icons/md";
import { FaCircleCheck } from "react-icons/fa6";
import { TbCircleXFilled } from "react-icons/tb";
import { RiRefund2Line } from "react-icons/ri";
import { statusTextColor } from "../../utils/util";
import ConfirmationModal from "../../components/user/Modals/ConfirmationModal";
import Review from "../../components/user/Review/Review";
import { ReviewInterface } from "../../types/RestaurantInterface";
import { useAppSelector } from "../../redux/store/Store";
import axios from "axios";

const ViewBooking: React.FC = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState<BookingInterface | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [reviews, setReviews] = useState<ReviewInterface[] | null>(null);
  const user = useAppSelector((state) => state.UserSlice);
  const navigate = useNavigate();

  useEffect(() => {
    axiosJWT
      .get(USER_API + `/bookings/${id}`)
      .then(({ data }) => {
        setBooking(data.bookingDetails);
        setReviews(data.reviews);
      })
      .catch(() => showToast("Oops! Something went wrong", "error"));
  }, []);

  const handleChat = () => {
    axios
      .post(CHAT_API + `/conversations`, {
        senderId: user.id,
        recieverId: booking?.restaurantId?._id,
      })
      .then(({ data }) => {
        const chatID: string = data.chats._id;
        navigate(`/chat?conversation=${chatID}`);
      })
      .catch(() => {
        console.log("error in sending chat");
      });
  };

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

  const isReviewed = useMemo(() => {
    if (reviews && reviews.length && booking) {
      const review = reviews.find(
        (review) =>
          review.restaurantId === booking.restaurantId._id &&
          review.userId._id === booking.userId._id
      );
      return review ? true : false;
    }
  }, [reviews, booking]);

  return (
    <>
      <div className="container mx-auto px-4 py-2 border rounded-lg shadow-md">
        <h1 className="text-center mb-4 text-2xl font-semibold">
          Booking Details
        </h1>
        <hr className="mt-2 h-0.5 border-t border-gray-300" />

        <div className="grid grid-cols-6 gap-4 ">
          <div className="col-span-6 md:col-span-3 p-4 space-y-3 mt-3">
            <div className="flex items-center gap-2">
              <Building />
              <p className="text-lg font-semibold font-display ">
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
              <p className="text-sm ">{booking?.tableId.capacity} Guests</p>
            </div>
          </div>
          <div className="col-span-6 md:col-span-3   p-4 space-y-2 mt-2">
            <div className="flex items-center gap-2">
              <Hash className="h-5 w-5" />
              <p className="text-lg font-semibold ">{booking?.bookingId}</p>
            </div>
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
              <p className="text-sm ">18%</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-lg font-semibold ">Amount Paid</p>
              <p className="text-base">₹{booking?.totalAmount}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 md:flex-row items-center justify-center mt-8">
          <Button
            label={`Chat with ${booking?.restaurantId?.restaurantName}`}
            className="block  bg-blue-400 hover:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
            handleButtonclick={handleChat}
          />
          {booking?.bookingStatus && booking?.bookingStatus === "Confirmed" && (
            <Button
              label="Cancel Booking"
              className="block  bg-red-400 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50"
              handleButtonclick={() => setIsOpen(true)}
            />
          )}
        </div>
      </div>
      {isOpen && (
        <ConfirmationModal
          setIsOpen={setIsOpen}
          handleConfirmation={handleCancellation}
          action="cancelBooking"
        />
      )}
      {!isReviewed &&
        reviews &&
        booking &&
        booking.bookingStatus === "Completed" && (
          <Review
            restaurantId={booking?.restaurantId._id}
            restauranName={booking?.restaurantId.restaurantName}
          />
        )}
    </>
  );
};

export default ViewBooking;
