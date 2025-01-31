import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
    user: null,
    loading: false,  // to track loading status of login request
    error: null,     // to store any error from the login request
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true; // set loading to true when login request starts
      state.error = null;   // reset error before making the request
    },
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload.user; // set user data
      state.loading = false;             // set loading to false after success
    },
    loginFailure: (state, action) => {
      state.loading = false;             // set loading to false after failure
      state.error = action.payload;     // store the error message
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;
