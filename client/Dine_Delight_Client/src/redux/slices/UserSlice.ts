import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserState {
  name: string | null;
  isAuthenticated: boolean | null;
  role: string | null;
  id?: string | null;
  access_token?: string | null;
  refresh_token?: string | null;
}

const initialState: UserState = {
  name: null,
  isAuthenticated: null,
  role: null,
  id: null,
  access_token: null,
  refresh_token: null,
};

const Userslice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload };
    },
    setTokens: (
      state,
      action: PayloadAction<{ access_token: string; refresh_token: string }>
    ) => {
      const { access_token, refresh_token } = action.payload;
      state.access_token = access_token;
      state.refresh_token = refresh_token;
    },
    clearUser: () => initialState,
  },
});

export const { setUser, setTokens, clearUser } = Userslice.actions;
export default Userslice.reducer;
