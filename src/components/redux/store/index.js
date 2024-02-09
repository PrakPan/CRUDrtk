import { configureStore } from "@reduxjs/toolkit";
import userDetail from "../slice/index";


 /**
 * @description  "A central store is created Here"
 * @summary 1. It has a single reducer name app that is imported from the userDetail slice
 *          
.
 */
export const store = configureStore({
  reducer: {
    app: userDetail,
  },
});