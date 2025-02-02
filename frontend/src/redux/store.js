import { configureStore } from "@reduxjs/toolkit";
import { blogApi } from "./api/blogApi";
import { authApi } from "./api/authApi";
import { userApi } from "./api/userApi";

import { recruitmentApi } from "./api/recruitmentApi";
import { companyApi } from "./api/companyApi";
import blogReducer from "./slices/blogSlice";
import { roleApi } from "./api/roleApi";
import { categoryApi } from "./api/categoryApi";
import { feedbackApi } from "./api/feedbackApi";
import { tagApi } from "./api/TagApi";
import { activityLogApi } from "./api/activityLogApi";
const store = configureStore({
  reducer: {
    [blogApi.reducerPath]: blogApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [companyApi.reducerPath]: companyApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [feedbackApi.reducerPath]: feedbackApi.reducer,
    [roleApi.reducerPath]: roleApi.reducer,
    [tagApi.reducerPath]: tagApi.reducer,
    [activityLogApi.reducerPath]: activityLogApi.reducer,
    [recruitmentApi.reducerPath]: recruitmentApi.reducer,
    blogs: blogReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(blogApi.middleware)
      .concat(authApi.middleware)
      .concat(userApi.middleware)
      .concat(companyApi.middleware)
      .concat(roleApi.middleware)
      .concat(categoryApi.middleware)
      .concat(feedbackApi.middleware)
      .concat(activityLogApi.middleware)
      .concat(tagApi.middleware)
      .concat(recruitmentApi.middleware),
});

export default store;
