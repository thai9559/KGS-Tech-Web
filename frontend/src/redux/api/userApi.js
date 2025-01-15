import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/api" }),
  tagTypes: ["User", "Role", "Permission"],
  endpoints: (builder) => ({
    // Lấy danh sách người dùng
    getUsers: builder.query({
      query: () => "/users",
      providesTags: ["User"],
    }),
    // Lấy chi tiết một người dùng
    getUser: builder.query({
      query: (id) => `/users/${id}`,
      providesTags: (result, error, id) => [{ type: "User", id }],
    }),
    // Tạo người dùng mới
    createUser: builder.mutation({
      query: (newUser) => ({
        url: "/register",
        method: "POST",
        body: newUser,
      }),
      invalidatesTags: ["User"],
    }),
    // Cập nhật thông tin người dùng
    updateUser: builder.mutation({
      query: ({ id, ...updatedUser }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: updatedUser,
      }),
      invalidatesTags: ["User"],
    }),
    // Xóa người dùng
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    // Lấy danh sách vai trò
    getRoles: builder.query({
      query: () => "/roles",
      providesTags: ["Role"],
    }),
    // Lấy danh sách quyền
    getPermissions: builder.query({
      query: () => "/permissions",
      providesTags: ["Permission"],
    }),
    // Gán vai trò cho người dùng
    assignRole: builder.mutation({
      query: (data) => ({
        url: "/user-role/assign",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    // Xóa vai trò khỏi người dùng
    removeRole: builder.mutation({
      query: (data) => ({
        url: "/user-role/remove",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    // Gán quyền cho người dùng
    assignPermissions: builder.mutation({
      query: (data) => ({
        url: "/user-permission/assign",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    // Xóa quyền khỏi người dùng
    removePermissions: builder.mutation({
      query: (data) => ({
        url: "/user-permission/remove",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useGetRolesQuery,
  useGetPermissionsQuery,
  useAssignRoleMutation,
  useRemoveRoleMutation,
  useAssignPermissionsMutation,
  useRemovePermissionsMutation,
} = userApi;
