import { configureStore } from "@reduxjs/toolkit";
import configSlice from "./configSlice";
import contentSlice from "./contentSlice";
const store = configureStore({
  reducer: {
    config: configSlice,
    content: contentSlice,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
