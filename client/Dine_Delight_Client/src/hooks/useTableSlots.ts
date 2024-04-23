import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosJWT from "../utils/axiosService";
import showToast from "../utils/toaster";
import { RESTAURANT_API } from "../constants";
import {
  TimeSlotInterface,
  TableSlotInterface,
} from "../types/RestaurantInterface";
import usePaginateState from "./usePaginateState";
import { convert24HourTime } from "../utils/timeConverter";

const useTableSlots = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [timeslots, setTimeSlots] = useState<TimeSlotInterface[]>([]);
  const [tableSlot, setTableSlot] = useState<TableSlotInterface[]>([]);
  const {
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    itemsPerPage,
    setItemsPerPage,
  } = usePaginateState();
  const [filter, setFilter] = useState({
    date: "",
    time: "",
  });
  const [isFilterOn, setIsFilterOn] = useState<boolean>(false);

  useEffect(() => {
    if (
      currentPage ||
      (isFilterOn && (filter.date.length || filter.time.length))
    )
      axiosJWT
        .get(RESTAURANT_API + `/table_slots/${id}`, {
          params: {
            page: currentPage,
            ...(isFilterOn && {
              date: filter.date,
              time: convert24HourTime(filter.time),
            }),
          },
        })
        .then(({ data }) => {
          const { tableSlot, count, limit } = data;
          setTableSlot(tableSlot);
          setPageSize(count);
          setItemsPerPage(limit);
        })
        .catch(() => {
          showToast("Oops! Something went wrong", "error");
          navigate("/restaurant/table");
        });
  }, [currentPage, isFilterOn, filter]);

  useEffect(() => {
    axiosJWT
      .get(RESTAURANT_API + `/time_slots`)
      .then(({ data }) => {
        setTimeSlots(data.timeSlots);
      })
      .catch(() => {
        showToast("Oops! Something went wrong", "error");
        navigate("/restaurant/table");
      });
  }, []);

  const handleAddedSlot = (newSlotData: TableSlotInterface) =>
    setTableSlot((curr) => [...curr, newSlotData]);

  const handleDeleteSlot = (id: string) => {
    axiosJWT
      .delete(RESTAURANT_API + `/table_slots/${id}`)
      .then(({ data }) => {
        showToast(data.message);
        const filteredSlots = tableSlot.filter((slot) => slot._id !== id);
        setTableSlot(filteredSlots);
      })
      .catch(() =>
        showToast("Oops! Something went wrong while deleting slot", "error")
      );
  };

  const handleFilterInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "time") setFilter((prev) => ({ ...prev, time: value }));
    else setFilter((prev) => ({ ...prev, date: new Date(value).toString() }));
  };

  return {
    tableSlot,
    timeslots,
    setCurrentPage,
    filter,
    setFilter,
    isFilterOn,
    setIsFilterOn,
    currentPage,
    pageSize,
    itemsPerPage,
    setTableSlot,
    handleAddedSlot,
    handleDeleteSlot,
    handleFilterInputChange,
  };
};
export default useTableSlots;
