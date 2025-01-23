import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/api" }),
  tagTypes: ["Blog", "ActivityLog"],
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => "/blogs",
      providesTags: ["Blog"],
    }),
    getBlogById: builder.query({
      query: (id) => `/blogs/${id}`, // API để lấy thông tin blog theo ID
      providesTags: (result, error, id) => [{ type: "Blog", id }],
    }),
    createBlog: builder.mutation({
      query: (newBlog) => ({
        url: "/blogs",
        method: "POST",
        body: newBlog,
      }),
      invalidatesTags: ["Blog", "ActivityLog"],
    }),
    updateBlog: builder.mutation({
      query: ({ id, ...updatedBlog }) => ({
        url: `/blogs/${id}`,
        method: "PUT",
        body: updatedBlog,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Lấy access_token từ localStorage
          "Content-Type": "application/json",
        },
      }),
      // invalidatesTags: (result, error, { id }) => [{ type: "Blog", id }],
      invalidatesTags: ["Blog", "ActivityLog"],
    }),

    updateVisibility: builder.mutation({
      query: ({ id, is_visible }) => ({
        url: `/blogs/${id}/visibility`,
        method: "PUT",
        body: { is_visible },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`, // Thêm token vào header
        },
      }),
      invalidatesTags: ["Blog", "ActivityLog"],
    }),

    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blog", "ActivityLog"],
    }),
    uploadImage: builder.mutation({
      query: (image) => {
        const formData = new FormData();
        formData.append("image", image);

        return {
          url: "/upload-image",
          method: "POST",
          body: formData,
        };
      },
    }),
  }),
});

// Export các hooks
export const {
  useGetBlogsQuery,
  useGetBlogByIdQuery, // Hook cho API lấy blog theo ID
  useCreateBlogMutation,
  useUpdateBlogMutation,
  useUpdateVisibilityMutation, // Hook mới cho cập nhật trạng thái ẩn/hiện
  useDeleteBlogMutation,
  useUploadImageMutation,
} = blogApi;
