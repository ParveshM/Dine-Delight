import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TableSlotInterface } from "../../types/RestaurantInterface";

const initialState: TableSlotInterface = {
  _id: null,
  tableId: null,
  startTime: null,
  endTime: null,
  slotDate: null,
  isAvailable: null,
};

const BookingSlice = createSlice({
  name: "BookingSlice",
  initialState,
  reducers: {
    setTableSlot: (state, action: PayloadAction<TableSlotInterface>) => {
      return { ...state, ...action.payload };
    },
    clearTableSlot: () => initialState,
  },
});

export const { setTableSlot, clearTableSlot } = BookingSlice.actions;
export default BookingSlice.reducer;
