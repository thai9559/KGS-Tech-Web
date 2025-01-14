import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/api" }),
  tagTypes: ["Blog"],
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => "/blogs",
      providesTags: ["Blog"],
    }),
    createBlog: builder.mutation({
      query: (newBlog) => ({
        url: "/blogs",
        method: "POST",
        body: newBlog,
      }),
      invalidatesTags: ["Blog"],
    }),
    updateBlog: builder.mutation({
      query: ({ id, ...updatedBlog }) => ({
        url: `/blogs/${id}`,
        method: "PUT",
        body: updatedBlog,
      }),
      invalidatesTags: ["Blog"],
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blog"],
    }),
  }),
});

// Export các hooks
export const {
  useGetBlogsQuery,
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
