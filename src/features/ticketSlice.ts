import { createSlice } from "@reduxjs/toolkit";

interface initialType {
  clients: {
    id: string;
    entertime: Date;
    paid: boolean;
  }[];
}

const initialState = {
  clients: [
    {
      id: "fe2fdsd3-5d32-4428-80ca-be13b04a015e",
      entertime: new Date("June 19 2022 17:00"),
      paid: false,
    },
    {
      id: "fsf45df2s3f-5d32-4428-80ca-be13b04a015e",
      entertime: new Date("June 20 2022 20:00"),
      paid: false,
    },
    {
      id: "e4c5a823-5d32-4428-80ca-be13b04a015e",
      entertime: new Date("June 19 2022 20:00"),
      paid: false,
    },
  ],
} as initialType;

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    assign: (state, action) => {
      state.clients.push({
        id: action.payload.id,
        entertime: action.payload.date,
        paid: false,
      });
    },
    deassign: (state, action) => {
      state.clients = state.clients.filter(
        (client) => client.id !== action.payload
      );
    },
    paid: (state, action) => {
      state.clients = state.clients.map((client) => {
        if (client.id === action.payload) {
          client.paid = true;
          return client;
        }
        return client;
      });
    },
  },
});

export default ticketSlice.reducer;
export const { assign, deassign, paid } = ticketSlice.actions;
