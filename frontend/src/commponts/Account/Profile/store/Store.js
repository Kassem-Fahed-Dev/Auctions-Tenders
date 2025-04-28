import { configureStore } from "@reduxjs/toolkit";
import ptnReducer from "../store/Redux";
export const Store = configureStore({
  reducer: {
    ptn_edit: ptnReducer,
  },
});
