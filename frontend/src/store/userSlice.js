import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    location: {
      userCity: "",
      postalCode: "",
    },
    cartCount: 0,
  },

  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
    },
    logout: (state) => {
      state.user = null;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setCartCount: (state, action) => {
      state.cartCount = action.payload;
    },
  },
});

export const { login, logout, setLocation, setCartCount } = userSlice.actions;

export default userSlice.reducer;
