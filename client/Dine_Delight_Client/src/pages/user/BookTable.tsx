import { useAppDispatch, useAppSelector } from "../../redux/store/Store";
import React, { useEffect, useRef, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { clearTableSlot } from "../../redux/slices/BookingSlice";
import { USER_API } from "../../constants";
import axios from "axios";
import Navbar from "../../components/user/Header/Navbar";
import { CalendarCheck2, Clock, Users } from "lucide-react";
import axiosJWT from "../../utils/axiosService";
import { loadStripe } from "@stripe/stripe-js";

interface RestaurantTableInterface {
  _id: string;
  tableNumber: string;
  capacity: number;
  location: string;
  restaurantId: {
    _id: string;
    restaurantName: string;
    tableRatePerPerson: number;
  };
}

const BookTable: React.FC = () => {
  const tableSlot = useAppSelector((state) => state.BookingSlice);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [tableData, setTableData] = useState<RestaurantTableInterface | null>(
    null
  );

  const [formData, setFormData] = useState({
    restaurantId: tableData?.restaurantId._id ?? "",
    tableId: tableSlot.tableId,
    tableSlotId: tableSlot._id ?? "",
    paymentMethod: "Online",
  });
  const hasPageBeenRendered = useRef(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  useEffect(() => {
    if (hasPageBeenRendered.current) {
      axios
        .get(USER_API + `/tables/${tableSlot.tableId}`)
        .then(({ data }) => {
          setTableData(data.tableData);
          setFormData((prev) => ({
            ...prev,
            restaurantId: data.tableData.restaurantId._id,
          }));
        })
        .catch(() => console.log("Error"));
      return () => {
        dispatch(clearTableSlot());
      };
    } else {
      hasPageBeenRendered.current = true;
    }
  }, []);
  const formattedDate = tableSlot?.slotDate
    ? new Date(tableSlot.slotDate).toLocaleDateString("en-us", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "";

  const handlePaynowButton = async () => {
    const stripe = await loadStripe(
      import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
    );
    setIsSubmitting(true);
    axiosJWT
      .post(USER_API + "/reserve_table", formData)
      .then(async ({ data }) => {
        if (data.id) {
          const result = await stripe?.redirectToCheckout({
            sessionId: data.id,
          });
          if (result?.error) console.error(result.error);
        }
        const bookingId = data.booking.bookingId
        navigate(`/payment_status/${bookingId}?success=true`)
      })
      .catch((error) => {
        console.log("Error in creating order" + error);
        setIsSubmitting(true);
      });
  };

  if (!tableSlot.tableId) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <Navbar />

      <div className="grid place-items-center h-screen mt-10 ">
        <div className="w-full max-w-md bg-white p-6 rounded-md shadow-md space-y-2">
          <h3 className="text-2xl font-semibold mb-4 text-center">
            Booking Summary
          </h3>
          <p className="">
            <span className="text-2xl font-semibold">
              {tableData?.restaurantId.restaurantName}
            </span>
          </p>
          <div className=" flex gap-2">
            <CalendarCheck2 className="h-5" />
            <p>{formattedDate}</p>
          </div>
          <div className=" flex gap-2">
            <Clock className="h-5" />
            <p>
              {tableSlot?.startTime} - {tableSlot?.endTime}
            </p>
          </div>
          <div className=" flex gap-2">
            <Users />
            <p>{tableData?.capacity} guests</p>
          </div>
          <hr className="bg-gray-200 " />

          <div className="bg-white  ">
            <h3 className="text-lg font-semibold ">Total Charges</h3>
            <p className="">
              <span className="font-semibold">Price Per Slot:</span> ₹
              {tableData?.restaurantId?.tableRatePerPerson} per person
            </p>
            <p className="">
              <span className="font-semibold">GST (18%):</span> ₹
              {(
                (18 / 100) *
                (tableData?.capacity ?? 0) *
                (tableData?.restaurantId?.tableRatePerPerson ?? 0)
              ).toFixed(2)}
            </p>
            <p className="font-semibold mb-6">
              <span className="font-semibold">Total Amount:</span> ₹
              {(
                (18 / 100) *
                  (tableData?.capacity ?? 0) *
                  (tableData?.restaurantId?.tableRatePerPerson ?? 0) +
                (tableData?.capacity ?? 0) *
                  (tableData?.restaurantId?.tableRatePerPerson ?? 0)
              ).toFixed(2)}
            </p>

            <div className="p-2">
              <label
                htmlFor="inlineRadio1"
                className="block mb-2 text-sm font-semibold text-gray-900 dark:text-white"
              >
                Payment Method
              </label>
              <div className="flex">
                <div className="mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]">
                  <input
                    className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                    type="radio"
                    name="paymentMethod"
                    id="inlineRadio2"
                    value="Online"
                    defaultChecked
                    onChange={() =>
                      setFormData((prev) => ({
                        ...prev,
                        paymentMethod: "Online",
                      }))
                    }
                  />
                  <label
                    className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                    htmlFor="inlineRadio2"
                  >
                    Online
                  </label>
                </div>
                <div className="mb-[0.125rem] mr-4 inline-block min-h-[1.5rem] pl-[1.5rem]">
                  <input
                    className="relative float-left -ml-[1.5rem] mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-primary checked:after:bg-primary checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-primary checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-primary dark:checked:after:border-primary dark:checked:after:bg-primary dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-primary dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
                    type="radio"
                    name="paymentMethod"
                    id="inlineRadio1"
                    value="Wallet"
                    onChange={() =>
                      setFormData((prev) => ({
                        ...prev,
                        paymentMethod: "Wallet",
                      }))
                    }
                  />
                  <label
                    className="mt-px inline-block pl-[0.15rem] hover:cursor-pointer"
                    htmlFor="inlineRadio1"
                  >
                    Wallet
                  </label>
                </div>
              </div>
            </div>
          </div>
          <button
            className="w-full  px-4 py-2 bg-indigo-500 hover:bg-indigo-600
           text-white text-sm font-medium rounded-md"
            onClick={handlePaynowButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Continue"}
          </button>
        </div>
      </div>
    </>
  );
};
export default BookTable;
