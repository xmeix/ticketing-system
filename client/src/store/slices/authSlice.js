import { createSlice } from "@reduxjs/toolkit";
import { login, logout, register } from "../apiCalls/auth";
import Cookies from "js-cookie";
// import { getCSRFToken } from "../apiCalls/apiService";
import toast from "react-hot-toast";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLoggedIn: false,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    reset: (state, action) => {
      state.isLoggedIn = false;
      state.error = null;
      state.loading = false;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // normal login
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
      state.error = null;
      const load = toast.loading("Connexion...");
      toast.dismiss(load);
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      state.isLoggedIn = true;
      state.user = action.payload.user;
      Cookies.set("access_token", action.payload.access_token);
      Cookies.set("refresh_token", action.payload.refresh_token);
      localStorage.setItem("isLoggedIn", true);
      toast.success("Connexion réussie");
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.isLoggedIn = false;
      state.user = null;
      toast.error(action.payload);
    });
    // register
    builder.addCase(register.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(register.fulfilled, (state) => {
      state.loading = false;
      toast.success("Inscription réussie");
    });
    builder.addCase(register.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      toast.error(action.payload);
      const load = toast.loading("Enregistrement...");
      toast.dismiss(load);
    });
    // logout
    builder.addCase(logout.pending, (state) => {
      state.loading = true;
      state.error = null;
      const load = toast.loading("Déconnexion...");
      toast.dismiss(load);
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.loading = false;
      state.isLoggedIn = false;
      state.user = null;
      localStorage.setItem("isLoggedIn", false);
      // Cookies.remove("csrftoken", { path: "" });
      toast.success("Au revoir!");
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
      state.isLoggedIn = false;
      state.user = null;
      toast.error(action.payload);

      //   state.token = null;
    });
  },
});

export const { reset, resetError, setError } = authSlice.actions;
export default authSlice.reducer;
