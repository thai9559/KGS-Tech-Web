import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const companyApi = createApi({
  reducerPath: "companyApi", // Định danh reducer
  baseQuery: fetchBaseQuery({ baseUrl: "http://127.0.0.1:8000/api" }),

  tagTypes: ["Company"], // Tag cho invalidation
  endpoints: (builder) => ({
    getCompany: builder.query({
      query: () => "/company", // Endpoint GET thông tin công ty
      providesTags: ["Company"],
    }),
    createCompany: builder.mutation({
      query: (newCompany) => ({
        url: "/company", // Endpoint POST tạo công ty
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
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["Company"],
    }),

    // New Mutation: Update Logo
    updateLogo: builder.mutation({
      query: (logoFile) => {
        const formData = new FormData();
        formData.append("logo", logoFile);
        return {
          url: "/company/logo", // Endpoint cập nhật logo
          method: "POST", // Sử dụng POST để gửi file
          body: formData,
        };
      },
      invalidatesTags: ["Company"],
    }),

    deleteCompany: builder.mutation({
      query: () => ({
        url: "/company", // Endpoint DELETE xóa công ty
        method: "DELETE",
      }),
      invalidatesTags: ["Company"],
    }),
    deleteLogo: builder.mutation({
      query: () => ({
        url: "/company/logo", // Endpoint DELETE xóa logo
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
  useUpdateLogoMutation, // Export mutation update logo
  useDeleteCompanyMutation,
  useDeleteLogoMutation,
} = companyApi;
