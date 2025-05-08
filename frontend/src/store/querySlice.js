import { createSlice } from "@reduxjs/toolkit";

const querySlice = createSlice({
  name: "query",
  initialState: {
    query: null,
  },

  reducers: {
    querySearch: (state, action) => {
      state.query = action.payload.query;
    },
  },
});

export const { querySearch } = querySlice.actions;

export default querySlice.reducer;
