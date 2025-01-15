import { configureStore } from "@reduxjs/toolkit";
import { blogApi } from "./api/blogApi";
import { authApi } from "./api/authApi";
import { userApi } from "./api/userApi";
import { companyApi } from "./api/CompanyApi";
import blogReducer from "./slices/blogSlice";
import { roleApi } from "./api/roleApi";
import { categoryApi } from "./api/categoryApi";
const store = configureStore({
  reducer: {
    [blogApi.reducerPath]: blogApi.reducer, // Reducer của Blog API
    [authApi.reducerPath]: authApi.reducer, // Reducer của Auth API
    [userApi.reducerPath]: userApi.reducer, // Reducer của User API
    [companyApi.reducerPath]: companyApi.reducer, // Reducer của Company API
    [categoryApi.reducerPath]: categoryApi.reducer, // Reducer của Company API
    [roleApi.reducerPath]: roleApi.reducer,
    blogs: blogReducer, // Reducer khác (nếu có)
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(blogApi.middleware)
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(companyApi.middleware)
      .concat(roleApi.middleware)
      .concat(categoryApi.middleware),
});

export default store;
