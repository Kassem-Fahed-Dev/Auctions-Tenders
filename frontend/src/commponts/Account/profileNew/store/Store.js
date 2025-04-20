import { configureStore } from "@reduxjs/toolkit";
import ptnReducer from "../store/Redux";
export const Store_App = configureStore({
  reducer: {
    ptn_edit: ptnReducer,
  },
});
