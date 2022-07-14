import { createSlice } from "@reduxjs/toolkit";

const configSlice = createSlice({
  name: "config",
  initialState: {
    mainConfig: {},
    headerConfig: {},
    footerConfig: {},
    asideConfig: {},
  },
  reducers: {},
});

export default configSlice.reducer;
