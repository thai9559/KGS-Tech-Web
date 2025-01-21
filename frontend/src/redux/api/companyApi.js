import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const companyApi = createApi({
  reducerPath: "companyApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://127.0.0.1:8000/api",
    prepareHeaders: (headers) => {
      headers.set("Accept", "application/json");
      return headers;
    },
  }),
  tagTypes: ["Company"],
  endpoints: (builder) => ({
    getCompany: builder.query({
      query: () => "/company",
      providesTags: ["Company"],
    }),
    createCompany: builder.mutation({
      query: (newCompany) => ({
        url: "/company",
        method: "POST",
        body: newCompany,
      }),
      invalidatesTags: ["Company"],
    }),
    updateCompany: builder.mutation({
      query: (updatedCompany) => ({
        url: "/company",
        method: "PUT",
        body: updatedCompany,
      }),
      invalidatesTags: ["Company"],
    }),
    updateLogo: builder.mutation({
      query: (formData) => ({
        url: "/company/logo",
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Company"], // Làm mới dữ liệu sau khi upload
    }),
    deleteCompany: builder.mutation({
      query: () => ({
        url: "/company",
        method: "DELETE",
      }),
      invalidatesTags: ["Company"],
    }),
    deleteLogo: builder.mutation({
      query: () => ({
        url: "/company/logo",
        method: "DELETE",
      }),
      invalidatesTags: ["Company"],
    }),
  }),
});

export const {
  useGetCompanyQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useUpdateLogoMutation,
  useDeleteCompanyMutation,
  useDeleteLogoMutation,
} = companyApi;
