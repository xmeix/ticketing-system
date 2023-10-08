import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "./apiService";
import axios from "axios";
import toast from "react-hot-toast";

export const getNotifications = createAsyncThunk(
  "api/notifications",
  async (body, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await apiService.user.get("api/notifications/");
      return res.data;
    } catch (error) {
      console.log(error.response.data.error);
      return rejectWithValue(error.response.data.error);
    }
  }
);