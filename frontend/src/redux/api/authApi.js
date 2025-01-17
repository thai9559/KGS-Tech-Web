import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api",
    prepareHeaders: (headers, { endpoint }) => {
      // Lấy token từ localStorage
      const token = localStorage.getItem("access_token");
      if (token && endpoint !== "login" && endpoint !== "register") {
        headers.set("Authorization", `Bearer ${token}`);
      }

      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Auth"], // Thêm tag type cho xác thực
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["Auth"], // Làm mới dữ liệu liên quan khi đăng nhập thành công
    }),
    getUser: builder.query({
      query: () => ({
        url: "/user",
        method: "GET",
      }),
      providesTags: ["Auth"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
      invalidatesTags: ["Auth"], // Làm mới dữ liệu liên quan khi đăng xuất
    }),
    register: builder.mutation({
      query: (newUser) => ({
        url: "/register",
        method: "POST",
        body: newUser,
      }),
    }),
  }),
});

// Export hooks để sử dụng trong component
export const {
  useLoginMutation,
  useGetUserQuery,
  useLogoutMutation,
  useRegisterMutation,
} = authApi;
