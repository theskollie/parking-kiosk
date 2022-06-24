import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  capacity: 200,
  hourlyrate: 5,
  available: 197,
};

const lotSlice = createSlice({
  name: "lot",
  initialState,
  reducers: {
    park: (state) => {
      state.available -= 1;
    },
    leave: (state) => {
      state.available += 1;
    },
    setCapacity: (state, action) => {
      state.capacity = action.payload;
    },
    setHourlyRate: (state, action) => {
      state.hourlyrate = action.payload;
    },
    setAvailable: (state, action) => {
      state.available = action.payload;
    },
  },
});

export default lotSlice.reducer;
export const { park, leave, setCapacity, setHourlyRate, setAvailable } =
  lotSlice.actions;
