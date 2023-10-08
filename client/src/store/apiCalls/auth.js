import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiService } from "./apiService";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

export const login = createAsyncThunk(
  "api/auth/login/",
  async (body, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await apiService.public.post("api/auth/login/", body);

      return res.data;
    } catch (error) {
      console.log(error.response.data.error);
      // toast.error(error.response.data.error);
      return rejectWithValue(error.response.data.error);
    }
  }
);
export const register = createAsyncThunk(
  "api/auth/register/",
  async (body, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await apiService.user.post("api/auth/register/", body);
      return res.data;
    } catch (error) {
      console.log(error.response.data.error);
      return rejectWithValue(error.response.data.detail);
    }
  }
);

export const logout = createAsyncThunk(
  "api/auth/logout",
  async (_, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const res = await apiService.user.post("api/auth/logout/");
      console.log("logout");
      if (res.status === 200) {
        Cookies.remove("access_token", { path: "" });
        Cookies.remove("refresh_token", { path: "" });
      }
      return res.data;
    } catch (error) {
      // toast.error(error.response.data.error);
      return rejectWithValue(error.response.data.error);
    }
  }
);
