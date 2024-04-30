import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LocationState {
  location: {
    type: "Point" | null;
    coordinates: (number | string)[];
  };
}

const initialState: LocationState = {
  location: {
    type: null,
    coordinates: [],
  },
};

const LocationSlice = createSlice({
  name: "LocationSlice",
  initialState,
  reducers: {
    setLocation: (state, action: PayloadAction<LocationState>) => {
      return { ...state, ...action.payload };
    },
    clearLocation: () => initialState,
  },
});

export const { setLocation, clearLocation } = LocationSlice.actions;
export default LocationSlice.reducer;
