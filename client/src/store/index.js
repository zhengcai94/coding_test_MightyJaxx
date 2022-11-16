import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./user-slice";
import productSlice from "./product-slice";

const store = configureStore({
  reducer: { user: userSlice, product: productSlice },
});

export default store;
