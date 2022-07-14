import { createSlice } from "@reduxjs/toolkit";
const initialState: { blog: Blog } = {
  blog: [],
};
const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setBlog(state, action) {
      state.blog = action.payload;
    },
  },
});

export const { setBlog } = contentSlice.actions;

export default contentSlice.reducer;
