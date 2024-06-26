import { useEffect, useState } from "react";
import { BookingInterface } from "../../../types/BookingInterface";
import axiosJWT from "../../../utils/axiosService";
import { USER_API } from "../../../constants";
import BookingHistoryList from "../../../components/user/Booking/BookinghistoryList";

const BookingHistory: React.FC = () => {
  const [bookings, setBookings] = useState<BookingInterface[]>([]);

  useEffect(() => {
    axiosJWT
      .get(USER_API + "/bookings")
      .then(({ data }) => setBookings(data.bookings))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="md:py-0   px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
      <h1 className="text-xl dark:text-white lg:text-2xl font-semibold leading-7 lg:leading-9 text-gray-800">
        Hisory & Recent bookings
      </h1>
      {bookings.length ? (
        <>
          {bookings.map((booking) => (
            <BookingHistoryList {...booking} key={booking._id} />
          ))}
        </>
      ) : (
        <div className="col-span-6 flex flex-col justify-center items-center">
          <h2 className="text-2xl  font-bold mb-2">No bookings yet </h2>
        </div>
      )}
    </div>
  );
};

export default BookingHistory;
