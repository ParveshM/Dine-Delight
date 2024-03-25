import { useEffect, useState } from "react";
import { BookingInterface } from "../types/BookingInterface";
import axiosJWT from "../utils/axiosService";
import { RESTAURANT_API } from "../constants";
import showToast from "../utils/toaster";

const useReservations = () => {
  const [bookings, setBookings] = useState<BookingInterface[]>([]);

  useEffect(() => {
    axiosJWT
      .get(RESTAURANT_API + "/bookings")
      .then(({ data }) => setBookings(data.reservations))
      .catch(() =>
        showToast("something went wrong while fetching reservations", "error")
      );
  }, []);

  return { bookings, setBookings };
};

export default useReservations;
