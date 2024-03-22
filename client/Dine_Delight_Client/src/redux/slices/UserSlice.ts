import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string | null;
  isAuthenticated: boolean | null;
  role: string | null;
}

const initialState: UserState = {
  name: null,
  isAuthenticated: null,
  role: null,
};

const Userslice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload };
    },
    clearUser: () => initialState,
  },
});

export const { setUser, clearUser } = Userslice.actions;
export default Userslice.reducer;
