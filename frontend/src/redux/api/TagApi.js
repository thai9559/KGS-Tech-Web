import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tagApi = createApi({
  reducerPath: "tagApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api",
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Tag"], // Tags for cache invalidation
  endpoints: (builder) => ({
    // Get all tags
    getTags: builder.query({
      query: () => "/tags",
      providesTags: ["Tag"], // Cache invalidation tag
    }),

    // Create a new tag
    createTag: builder.mutation({
      query: (newTag) => ({
        url: "/tags",
        method: "POST",
        body: newTag,
      }),
      invalidatesTags: ["Tag"], // Invalidate cache for tags after creating
    }),

    // Update an existing tag
    updateTag: builder.mutation({
      query: (updatedTag) => ({
        url: `/tags/${updatedTag.id}`,
        method: "PUT",
        body: updatedTag,
      }),
      invalidatesTags: ["Tag"], // Invalidate cache for tags after updating
    }),

    // Delete a tag
    deleteTag: builder.mutation({
      query: (id) => ({
        url: `/tags/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Tag"], // Invalidate cache for tags after deletion
    }),
  }),
});

export const {
  useGetTagsQuery,
  useCreateTagMutation,
  useUpdateTagMutation,
  useDeleteTagMutation,
} = tagApi;
