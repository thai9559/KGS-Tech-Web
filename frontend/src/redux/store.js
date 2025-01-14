import { configureStore } from "@reduxjs/toolkit";
import { blogApi } from "./api/blogApi";
import { authApi } from "./api/authApi";
import { userApi } from "./api/userApi";
import { companyApi } from "./api/CompanyApi";
import blogReducer from "./slices/blogSlice";

const store = configureStore({
  reducer: {
    [blogApi.reducerPath]: blogApi.reducer, // Reducer của Blog API
    [authApi.reducerPath]: authApi.reducer, // Reducer của Auth API
    [userApi.reducerPath]: userApi.reducer, // Reducer của User API
    [companyApi.reducerPath]: companyApi.reducer, // Reducer của Company API
    blogs: blogReducer, // Reducer khác (nếu có)
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(blogApi.middleware)
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(companyApi.middleware), // Thêm middleware của Company API
});

export default store;
