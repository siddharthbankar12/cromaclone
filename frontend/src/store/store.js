import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import queryReducer from "./querySlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    query: queryReducer,
  },
});

export default store;
