import { useEffect, useState } from "react";
import { ADMIN_API } from "../constants";
import { BookingInterface } from "../types/BookingInterface";
import showToast from "../utils/toaster";
import axiosJWT from "../utils/axiosService";
import usePaginateState from "./usePaginateState";
import { GraphData } from "../types/PropsType";

export type DashboardDataType = {
  totalUsers: number;
  totalBookings: number;
  totalRestaurants: number;
  totalProfit: number;
  data: GraphData[];
};

export default function useAdminDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardDataType | null>(
    null
  );
  const [bookings, setBookings] = useState<BookingInterface[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
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
          graphData,
          bookings,
          count,
          limit,
        } = data;
        setDashboardData({
          totalBookings,
          totalUsers,
          totalProfit,
          totalRestaurants,
          data: graphData,
        });
        setBookings(bookings);
        setPageSize(count);
        setItemsPerPage(limit);
      })
      .catch(() => {
        showToast("Oops! Something went wrong", "error");
      });
  }, [selectedStatus, currentPage]);

  return {
    dashboardData,
    currentPage,
    pageSize,
    isModalOpen,
    setIsModalOpen,
    itemsPerPage,
    bookings,
    setSelectedStatus,
    setCurrentPage,
  };
}
