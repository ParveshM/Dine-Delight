import { combineReducers } from "@reduxjs/toolkit";
import UserSlice from "./UserSlice";
export const rootReducer = combineReducers({
  UserSlice,
});
export type RootState = ReturnType<typeof rootReducer>;
