import { createSlice } from "@reduxjs/toolkit";
import { createTicket } from "../apiCalls/ticket";
const ticketSlice = createSlice({
  name: "ticket",
  initialState: {
    tickets: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    setTickets: (state, action) => {
      state.tickets.push(action.payload);
    },
    resetTicket: (state, action) => {
      state.tickets = [];
      state.error = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    // normal login
    builder.addCase(createTicket.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createTicket.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tickets = action.payload.tickets;
    });
    builder.addCase(createTicket.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
  },
});

export const { setTickets, resetTicket } = ticketSlice.actions;
export default ticketSlice.reducer;
