import { createSlice } from "@reduxjs/toolkit";
const initialState: { blog: Blog; currentBlogContent: string } = {
  blog: [],
  currentBlogContent: "",
};
const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setBlog(state, action) {
      state.blog = action.payload;
    },
    setCurrentBlogContent(state, action) {
      state.currentBlogContent = action.payload;
    },
  },
});

export const { setBlog, setCurrentBlogContent } = contentSlice.actions;

export default contentSlice.reducer;
