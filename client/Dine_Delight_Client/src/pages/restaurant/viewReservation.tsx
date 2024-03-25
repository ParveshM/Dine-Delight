import { FaCircleCheck } from "react-icons/fa6";
import { TbCircleXFilled } from "react-icons/tb";
import { RiRefund2Line } from "react-icons/ri";
import Button from "../../components/restaurant/Button";
import { Calendar, ChevronDown, Users } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { FormEvent, useEffect, useState } from "react";
import axiosJWT from "../../utils/axiosService";
import { RESTAURANT_API } from "../../constants";
import { BookingInterface } from "../../types/BookingInterface";
import { MdOutlineTableBar } from "react-icons/md";
import showToast from "../../utils/toaster";
import ViewReservationShimmer from "../../components/shimmers/viewReservationsShimmer";

const ViewReservation: React.FC = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState<BookingInterface | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>("Pending");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    axiosJWT
      .get(RESTAURANT_API + `/bookings/${id}`)
      .then(({ data }) => {
        setBooking(data.bookingDetails);
        setIsLoading(false);
        setSelectedStatus(data.bookingDetails.bookingStatus);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    axiosJWT
      .patch(RESTAURANT_API + `/booking/edit/${id}`, {
        bookingStatus: selectedStatus,
        userID: booking?.userId._id,
      })
      .then(({ data }) => {
        showToast(data.message);
        navigate("/restaurant/reservations");
      })
      .catch(() => {
        showToast("Oops! Something went wrong", "error");
        navigate("/restaurant/reservations");
      });
  };
  return (
    <div className="flex flex-col items-center justify-center w-full  dark:bg-gray-900">
      <div className="w-full max-w-2xl">
        <form onSubmit={handleSubmit}>
          <div className="bg-white rounded-lg shadow-md dark:bg-gray-700">
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                Update Reservation
              </h2>
              <hr />
              <div className="text-gray-600 dark:text-gray-400 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 p-6 ">
                  <h3 className="text-lg font-semibold mb-4">
                    Customer Information
                  </h3>
                  {isLoading ? (
                    <ViewReservationShimmer />
                  ) : (
                    <div className="space-y-2">
                      <div className="">
                        <p className="text-sm font-semibold">Name:</p>
                        <p className="text-sm">{booking?.userId.name}</p>
                      </div>
                      <div className="">
                        <p className="text-sm font-semibold">Email:</p>
                        <p className="text-sm">{booking?.userId.email}</p>
                      </div>
                      <div className=" flex items-center gap-2">
                        <p className="text-2xl">
                          <MdOutlineTableBar />
                        </p>
                        <p className="text-sm">
                          {booking?.tableId.tableNumber}
                        </p>
                      </div>
                      <div className=" flex items-center gap-2">
                        <Calendar />
                        <p className="text-sm">
                          {booking?.tableSlotId?.slotDate &&
                            new Date(
                              booking?.tableSlotId.slotDate
                            ).toLocaleDateString("en-us", {
                              weekday: "long",
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}{" "}
                          - {booking?.tableSlotId.startTime}
                        </p>
                      </div>
                      <div className=" flex items-center gap-2">
                        <p className="text-sm font-semibold">
                          <Users />
                        </p>
                        <p className="text-sm">
                          {booking?.tableId.capacity} guests
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="bg-white dark:bg-gray-800 p-6 ">
                  <h3 className="text-lg font-semibold mb-4">
                    Booking Details
                  </h3>
                  {isLoading ? (
                    <ViewReservationShimmer />
                  ) : (
                    <div className="space-y-2">
                      <div>
                        <p className="text-sm font-semibold">Booking ID:</p>
                        <p className="text-sm">{booking?.bookingId}</p>
                      </div>
                      <div className="">
                        <p className="text-sm font-semibold">
                          Payment Method :
                        </p>
                        <div className="text-sm flex items-center gap-2">
                          <p>{booking?.paymentMethod}</p>
                          <p className="inline-flex gap-2 items-center">
                            - {booking?.paymentStatus}
                            {booking?.paymentStatus === "Paid" ? (
                              <FaCircleCheck color="#2eff51" />
                            ) : booking?.paymentStatus === "Failed" ? (
                              <TbCircleXFilled className="text-red-500" />
                            ) : (
                              <RiRefund2Line className="text-blue-500" />
                            )}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <p className="text-sm font-semibold mr-2">
                          Booking Status:
                        </p>
                        <div className="relative">
                          <select
                            className="block appearance-none bg-white border border-gray-300 text-sm py-1 px-2 pr-8 rounded-md focus:outline-none focus:border-blue-500"
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                          >
                            {booking?.bookingStatus === "Cancelled" ? (
                              <option value="Cancelled">Cancelled</option>
                            ) : (
                              <>
                                <option value="Pending">Pending</option>
                                <option value="Confirmed">Confirmed</option>
                                <option value="Cancelled">Cancelled</option>
                                <option value="Checked-in">Checked-in</option>
                                <option value="No-show">No-show</option>
                                <option value="Completed">Completed</option>
                              </>
                            )}
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                            <ChevronDown />
                          </div>
                        </div>
                      </div>

                      <div>
                        <p className="text-sm font-semibold">GST:</p>
                        <p className="text-sm">{booking?.gstAmount}</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold">Amount Paid:</p>
                        <p className="text-sm">₹ {booking?.totalAmount}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="p-2  flex justify-end border-t ">
              <Button
                label="Update"
                handleButtonclick={() => ""}
                isDisabled={booking?.bookingStatus === "Cancelled"}
                buttontype="submit"
                className={`text-white ${
                  booking?.bookingStatus === "Cancelled"
                    ? "bg-indigo-400"
                    : "bg-indigo-600 hover:bg-indigo-800"
                }  focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 
              py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800`}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewReservation;
