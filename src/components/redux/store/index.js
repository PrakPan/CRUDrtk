import { configureStore } from "@reduxjs/toolkit";
import userDetail from "../slice/index";

export const store = configureStore({
  reducer: {
    app: userDetail,
  },
});