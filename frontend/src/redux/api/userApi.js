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
        body: newUser, // Bao gồm role_id
      }),
      invalidatesTags: ["User"],
    }),
    // Cập nhật thông tin người dùng
    updateUser: builder.mutation({
      query: ({ id, ...updatedUser }) => ({
        url: `/users/${id}`,
        method: "PUT",
        body: updatedUser, // Bao gồm role_id
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
      transformResponse: (response) => response.data,
      providesTags: ["Role"],
    }),

    getAllPermissions: builder.query({
      query: () => "/permissions",
      transformResponse: (response) => response.data,
      providesTags: ["Permission"],
    }),
    // Lấy danh sách quyền
    getPermissions: builder.query({
      query: (userId) => `/user/${userId}/permissions`,
      providesTags: ["Permission"],
    }),
    // Gán quyền cho người dùng
    assignPermissions: builder.mutation({
      query: (data) => {
        console.log("Dữ liệu gửi đi (assignPermissions) trong query:", data); // Log dữ liệu trong query

        return {
          url: "/user/assign-permissions",
          method: "POST",
          body: data,
          headers: {
            "Content-Type": "application/json", // Thêm Content-Type nếu cần
          },
        };
      },
      invalidatesTags: ["User"],
    }),

    // Xóa quyền khỏi người dùng
    removePermissions: builder.mutation({
      query: (data) => ({
        url: "/user/remove-permissions",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    getRoles: builder.query({
      query: () => "/roles",
      transformResponse: (response) => response.data,
      providesTags: ["Role"],
    }),
    // Lấy chi tiết vai trò
    getRole: builder.query({
      query: (id) => `/roles/${id}`,
      providesTags: (result, error, id) => [{ type: "Role", id }],
    }),
    // Tạo vai trò mới
    createRole: builder.mutation({
      query: (newRole) => ({
        url: "/roles",
        method: "POST",
        body: newRole,
      }),
      invalidatesTags: ["Role"],
    }),
    // Cập nhật vai trò
    updateRole: builder.mutation({
      query: ({ id, ...updatedRole }) => ({
        url: `/roles/${id}`,
        method: "PUT",
        body: updatedRole,
      }),
      invalidatesTags: ["Role"],
    }),
    // Xóa vai trò
    deleteRole: builder.mutation({
      query: (id) => ({
        url: `/roles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Role"],
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
  useGetAllPermissionsQuery,
  useGetPermissionsQuery,
  useAssignPermissionsMutation,
  useRemovePermissionsMutation,
  useGetRoleQuery,
  useCreateRoleMutation,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} = userApi;
