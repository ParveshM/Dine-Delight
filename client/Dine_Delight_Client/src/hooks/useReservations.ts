import { useEffect, useState } from "react";
import { BookingInterface } from "../types/BookingInterface";
import axiosJWT from "../utils/axiosService";
import { RESTAURANT_API } from "../constants";
import showToast from "../utils/toaster";
import usePaginateState from "./usePaginateState";

const useReservations = () => {
  const [bookings, setBookings] = useState<BookingInterface[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);
  const {
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    itemsPerPage,
    setItemsPerPage,
  } = usePaginateState();

  useEffect(() => {
    axiosJWT
      .get(RESTAURANT_API + "/bookings", {
        params: {
          status: selectedStatus,
          page: currentPage,
        },
      })
      .then(({ data }) => {
        const { reservations, count, limit } = data;
        setBookings(reservations);
        setPageSize(count);
        setItemsPerPage(limit);
      })
      .catch(() =>
        showToast("something went wrong while fetching reservations", "error")
      );
  }, [currentPage, selectedStatus]);

  return {
    bookings,
    setSelectedStatus,
    setCurrentPage,
    currentPage,
    pageSize,
    itemsPerPage,
  };
};

export default useReservations;
