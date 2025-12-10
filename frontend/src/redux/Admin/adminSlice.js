import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  id: "",
  token: "",
  isAuthenticated: false,
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin: (state, action) => {
      const admin = action.payload.admin || {};
      state.name = admin.name || "";
      state.email = admin.email || "";
      state.id = admin._id || "";
      state.token = action.payload.token || "";
      state.isAuthenticated = !!action.payload.token;
    },
    logoutAdmin: () => initialState,
  },
});

export const { setAdmin, logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;

