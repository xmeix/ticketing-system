import { createSlice } from "@reduxjs/toolkit";

import toast from "react-hot-toast";
import { getNotifications } from "../apiCalls/notification";
const NotificationSlice = createSlice({
  name: "notification",
  initialState: {
    notifications: [],
    nLoading: false,
    error: null,
  },
  reducers: {
    resetNotification: (state) => {
      state.notifications = [];
    },
  },
  extraReducers: (builder) => {
    // create Notification
    builder.addCase(getNotifications.pending, (state, action) => {
      state.nLoading = true;
      state.error = null;
    });
    builder.addCase(getNotifications.fulfilled, (state, action) => {
      state.notifications = action.payload;
      state.nLoading = false;
    });
    builder.addCase(getNotifications.rejected, (state, action) => {
      state.error = action.payload;
      state.nLoading = false;
    });
  },
});

export const { resetNotification } = NotificationSlice.actions;
export default NotificationSlice.reducer;
