import { combineReducers } from "@reduxjs/toolkit";
import UserSlice from "../slices/UserSlice";
import LocationSlice from "../slices/LocationSlice";
import BookingSlice from "../slices/BookingSlice";
export const rootReducer = combineReducers({
  UserSlice,
  LocationSlice,
  BookingSlice,
});
export type RootState = ReturnType<typeof rootReducer>;
