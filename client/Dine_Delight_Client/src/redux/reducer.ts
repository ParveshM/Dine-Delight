import { combineReducers } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
import LocationSlice from "./LocationSlice";
export const rootReducer = combineReducers({
  UserSlice,
  LocationSlice,
});
export type RootState = ReturnType<typeof rootReducer>;
