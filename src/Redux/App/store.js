import { configureStore } from "@reduxjs/toolkit";
import { foodsApi } from "../features/Foods/FoodsSlices";
const store = configureStore({
  reducer: {
    [foodsApi.reducerPath]: foodsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(foodsApi.middleware);
  },
});

export default store;
