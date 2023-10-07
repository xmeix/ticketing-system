import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "./apiService";
import axios from "axios";
import toast from "react-hot-toast";

export const prendreTicket = createAsyncThunk(
  "api/tickets/update",
  async (body, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      console.log("data: ", body);
      const res = await apiService.user.patch(
        `api/tickets/update/${body.id}/`,
        {
          etat: body.etat,
        }
      );
      return res.data;
    } catch (error) {
      console.log(error.response.data.error);
      return rejectWithValue(error.response.data.error);
    }
  }
);
export const getTickets = createAsyncThunk(
  "api/tickets/",
  async (body, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await apiService.user.get("api/tickets/");
      return res.data;
    } catch (error) {
      console.log(error.response.data.error);
      return rejectWithValue(error.response.data.error);
    }
  }
);
export const createTicket = createAsyncThunk(
  "api/tickets/create/",
  async (body, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await apiService.userFormData.post(
        "api/tickets/create/",
        body
      );
      return res.data;
    } catch (error) {
      console.log(error.response.data.error);
      return rejectWithValue(error.response.data.error);
    }
  }
);

export const createReply = createAsyncThunk(
  "api/tickets/reply",
  async (body, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await apiService.userFormData.post(
        `api/tickets/reply/${body.id}/`,
        body.reply
      );
      return res.data;
    } catch (error) {
      console.log(error.response.data.error);
      return rejectWithValue(error.response.data.error);
    }
  }
);
