import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosJWT from "../utils/axiosService";
import showToast from "../utils/toaster";
import { RESTAURANT_API } from "../constants";
import {
  TimeSlotInterface,
  TableSlotInterface,
} from "../types/RestaurantInterface";

const useTableSlots = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [timeslots, setTimeSlots] = useState<TimeSlotInterface[]>([]);
  const [tableSlot, setTableSlot] = useState<TableSlotInterface[]>([]);
  useEffect(() => {
    axiosJWT
      .get(RESTAURANT_API + `/get_allTableSlots/${id}`)
      .then(({ data }) => {
        setTableSlot(data.tableSlot);
      })
      .catch(() => {
        showToast("Oops! Something went wrong", "error");
        navigate("/restaurant/table");
      });
  }, []);

  useEffect(() => {
    axiosJWT
      .get(RESTAURANT_API + `/get_timeSlots`)
      .then(({ data }) => {
        setTimeSlots(data.timeSlots);
      })
      .catch(() => {
        showToast("Oops! Something went wrong", "error");
        navigate("/restaurant/table");
      });
  }, []);

  return { tableSlot, timeslots, setTableSlot };
};
export default useTableSlots;
