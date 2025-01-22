import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const activityLogApi = createApi({
  reducerPath: "activityLogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("access_token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["ActivityLog"],
  endpoints: (builder) => ({
    // Lấy danh sách log hoạt động
    getActivityLogs: builder.query({
      query: () => "/activity-logs",
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: "ActivityLog", id })),
              { type: "ActivityLog", id: "LIST" },
            ]
          : [{ type: "ActivityLog", id: "LIST" }],
    }),

    // Xem chi tiết một log
    getActivityLog: builder.query({
      query: (id) => `/activity-logs/${id}`,
      providesTags: (result, error, id) => [{ type: "ActivityLog", id }],
    }),

    // Xóa một log
    deleteActivityLog: builder.mutation({
      query: (id) => ({
        url: `/activity-logs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "ActivityLog", id: "LIST" }], // Làm mới danh sách logs
    }),
  }),
});

export const {
  useGetActivityLogsQuery,
  useGetActivityLogQuery,
  useDeleteActivityLogMutation,
} = activityLogApi;
