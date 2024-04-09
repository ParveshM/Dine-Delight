import { combineReducers } from "@reduxjs/toolkit";
import UserSlice from "../slices/UserSlice";
import LocationSlice from "../slices/LocationSlice";
import BookingSlice from "../slices/BookingSlice";
import CartSlice from "../slices/CartSlice";
export const rootReducer = combineReducers({
  UserSlice,
  LocationSlice,
  BookingSlice,
  CartSlice,
});
export type RootState = ReturnType<typeof rootReducer>;
