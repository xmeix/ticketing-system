import { createSlice } from "@reduxjs/toolkit";
import { createTicket, getTickets } from "../apiCalls/ticket";
import toast from "react-hot-toast";
const ticketSlice = createSlice({
  name: "ticket",
  initialState: {
    tickets: [],
    replies: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    // setTickets: (state, action) => {
    //   state.tickets.push(action.payload);
    // },
    resetTicket: (state, action) => {
      state.tickets = [];
      state.error = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    // create ticket
    builder.addCase(createTicket.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
      const load = toast.loading("création d'un ticket...");
      toast.dismiss(load);
    });
    builder.addCase(createTicket.fulfilled, (state, action) => {
      state.isLoading = false;
      const newTicket = action.payload;
      const isTicketAlreadyExists = state.tickets.some(
        (ticket) => ticket.id === newTicket.id
      );
      if (!isTicketAlreadyExists) {
        state.tickets.push(newTicket);
      }
      toast.success("ticket créé!");
    });
    builder.addCase(createTicket.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      toast.error(action.payload);
    });
    // normal login
    builder.addCase(getTickets.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getTickets.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tickets = action.payload.tickets;
      state.replies = action.payload.replies;
    });
    builder.addCase(getTickets.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
  },
});

export const { resetTicket } = ticketSlice.actions;
export default ticketSlice.reducer;
