import { useEffect, useState } from "react";
import { ADMIN_API } from "../constants";
import { BookingInterface } from "../types/BookingInterface";
import showToast from "../utils/toaster";
import axiosJWT from "../utils/axiosService";
import usePaginateState from "./usePaginateState";

type DashboardDataType = {
  totalUsers: number;
  totalBookings: number;
  totalRestaurants: number;
  totalProfit: number;
};

export default function useAdminDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardDataType | null>(
    null
  );
  const [bookings, setBookings] = useState<BookingInterface[]>([]);
  const [loading, setLoading] = useState(true);
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
      .get(ADMIN_API + "/dashboard", {
        params: { status: selectedStatus, page: currentPage },
      })
      .then(({ data }) => {
        const {
          totalUsers,
          totalBookings,
          totalRestaurants,
          totalProfit,
          bookings,
          count,
          limit,
        } = data;
        setDashboardData({
          totalBookings,
          totalUsers,
          totalProfit,
          totalRestaurants,
        });
        setBookings(bookings);
        setPageSize(count);
        setItemsPerPage(limit);
        setLoading(false);
      })
      .catch(() => {
        showToast("Oops! Something went wrong", "error");
        setLoading(false);
      });
  }, [selectedStatus, currentPage]);

  return {
    dashboardData,
    loading,
    currentPage,
    pageSize,
    itemsPerPage,
    bookings,
    setSelectedStatus,
    setCurrentPage,
  };
}
