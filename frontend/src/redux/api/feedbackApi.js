import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const feedbackApi = createApi({
  reducerPath: "feedbackApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/api" }),
  tagTypes: ["Feedback"],
  endpoints: (builder) => ({
    getFeedbacks: builder.query({
      query: () => "/feedback",
      providesTags: ["Feedback"],
    }),
    getFeedback: builder.query({
      query: (id) => `/feedback/${id}`,
      providesTags: (result, error, id) => [{ type: "Feedback", id }],
    }),
    createFeedback: builder.mutation({
      query: (newFeedback) => ({
        url: "/feedback",
        method: "POST",
        body: newFeedback,
      }),
      invalidatesTags: ["Feedback"],
    }),
    updateFeedbackVisibility: builder.mutation({
      query: ({ id, is_visible }) => ({
        url: `/feedback/${id}/visibility`,
        method: "PATCH",
        body: { is_visible },
      }),
      invalidatesTags: ["Feedback"],
    }),

    deleteFeedback: builder.mutation({
      query: (id) => ({
        url: `/feedback/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Feedback"],
    }),
  }),
});

export const {
  useGetFeedbacksQuery,
  useGetFeedbackQuery,
  useCreateFeedbackMutation,
  useUpdateFeedbackVisibilityMutation,
  useDeleteFeedbackMutation,
} = feedbackApi;
