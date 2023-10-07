import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "./apiService";
import axios from "axios";
import toast from "react-hot-toast";

export const getTickets = createAsyncThunk(
  "api/tickets/",
  async (body, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await apiService.user.get("api/tickets/");
      return res.data;
    } catch (error) {
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
      return rejectWithValue(error.response.data.error);
    }
  }
);
export const createTicket = createAsyncThunk(
  "api/tickets/create/",
  async (body, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await apiService.userFormData.post("api/tickets/create/", body);
      return res.data;
    } catch (error) {
      console.log(error.response.data.error);
      toast.error(error.response.data.error);
      return rejectWithValue(error.response.data.error);
    }
  }
);
