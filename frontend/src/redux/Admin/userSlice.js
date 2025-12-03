import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  phone: "",
  id: "",
  token: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      const user = action.payload.user || {};

      state.name = user.name || "";
      state.email = user.email || "";
      state.phone = user.phone || "";
      state.id = user._id || "";
      state.token = action.payload.token || "";
    },

    logoutUser: () => initialState,
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
