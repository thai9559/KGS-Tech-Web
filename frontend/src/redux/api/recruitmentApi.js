import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const recruitmentApi = createApi({
  reducerPath: "recruitmentApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/api" }),
  tagTypes: ["Recruitment"],
  endpoints: (builder) => ({
    getRecruitments: builder.query({
      query: () => "/recruitments",
      providesTags: ["Recruitment"],
    }),
    getRecruitment: builder.query({
      query: (id) => `/recruitments/${id}`,
      providesTags: (result, error, id) => [{ type: "Recruitment", id }],
    }),
    createRecruitment: builder.mutation({
      query: (formData) => ({
        url: "/recruitments",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Recruitment"],
    }),
    updateRecruitment: builder.mutation({
      query: ({ id, ...updates }) => ({
        url: `/recruitments/${id}`,
        method: "PUT",
        body: updates,
      }),
      invalidatesTags: ["Recruitment"],
    }),
    deleteRecruitment: builder.mutation({
      query: (id) => ({
        url: `/recruitments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Recruitment"],
    }),
  }),
});

export const {
  useGetRecruitmentsQuery,
  useGetRecruitmentQuery,
  useCreateRecruitmentMutation,
  useUpdateRecruitmentMutation,
  useDeleteRecruitmentMutation,
} = recruitmentApi;
