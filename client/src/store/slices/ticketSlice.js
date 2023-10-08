import { createSlice } from "@reduxjs/toolkit";
import {
  createReply,
  createTicket,
  getTickets,
  prendreTicket,
} from "../apiCalls/ticket";
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
      state.replies = [];
      state.error = null;
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    // create ticket
    builder.addCase(createTicket.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
      const load = toast.loading("création d'un ticket...", {
        id: "creating-ticket",
      });
      toast.dismiss(load);
    });
    builder.addCase(createTicket.fulfilled, (state, action) => {
      state.isLoading = false;
      // const newTicket = action.payload;
      // const isTicketAlreadyExists = state.tickets.some(
      //   (ticket) => ticket.id === newTicket.id
      // );
      // if (!isTicketAlreadyExists) {
      //   state.tickets.push(newTicket);
      // }
      toast.success("ticket créé!", { id: "ticket-cree" });
    });
    builder.addCase(createTicket.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      toast.error(action.payload);
    });
    // retrieve all tickets and replies
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
    // update ticket state (prendre ticket)
    builder.addCase(prendreTicket.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
      const load = toast.loading("un moment s'il vous plait...", {
        id: "taking-ticket",
      });
      toast.dismiss(load);
    });
    builder.addCase(prendreTicket.fulfilled, (state, action) => {
      state.isLoading = false;

      // const updatedTicket = action.payload;
      // const filteredTickets = state.tickets.filter(
      //   (ticket) => ticket.id !== updatedTicket.id
      // );

      // filteredTickets.push(updatedTicket);
      // state.tickets = filteredTickets;
      toast.success("ticket pris.", { id: "ticket-pris" });
    });
    builder.addCase(prendreTicket.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      toast.error("oups, vous ne pouvez prendre ce ticket!", {
        id: "ticket-error",
      });
    });
    // SEND REPLY
    builder.addCase(createReply.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
      const load = toast.loading("Envoi du ticket...", { id: "envoi-ticket" });
      toast.dismiss(load);
    });
    builder.addCase(createReply.fulfilled, (state, action) => {
      state.isLoading = false;
      const newReply = action.payload;
      const ReplyAlreadyExists = state.replies.some(
        (reply) => reply.id === newReply.id
      );
      if (!ReplyAlreadyExists) {
        state.replies.push(newReply);
      }
      toast.success("Ticket Envoyé!", { id: "ticket-envoyé" });
    });
    builder.addCase(createReply.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
      toast.error(action.payload, { id: "error" });
    });
  },
});

export const { resetTicket } = ticketSlice.actions;
export default ticketSlice.reducer;
