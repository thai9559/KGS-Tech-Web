import { configureStore } from "@reduxjs/toolkit";
import { blogApi } from "./api/blogApi";
import blogReducer from "./slices/blogSlice";

const store = configureStore({
  reducer: {
    [blogApi.reducerPath]: blogApi.reducer, // Reducer của RTK Query (API logic)
    blogs: blogReducer, // Reducer của Blog Slice (state logic)
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(blogApi.middleware), // Thêm middleware của RTK Query
});

export default store;
