import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },

    setCredentials: (state, action) => {
      const { user, token } = action.payload || {};
      state.user = user || null;
      state.isAuthenticated = !!user;
      if (token) {
        localStorage.setItem("token", token);
      }
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
    },
  },
});

export const { setUser, setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
