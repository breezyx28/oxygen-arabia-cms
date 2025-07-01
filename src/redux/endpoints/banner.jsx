// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import API_URL from "../config";
import { prepareHeaders } from "../ApiConfig";

// Define a service using a base URL and expected endpoints
export const bannerApi = createApi({
  reducerPath: "bannerApi",
  tagTypes: ["Banner"],
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/`, prepareHeaders }),
  endpoints: (builder) => ({
    allBanners: builder.query({
      query: () => ({
        url: "banners",
      }),
      // transformResponse: ({ data }) => response.data,
      providesTags: ["Banner"],
    }),
    lastBanner: builder.query({
      query: () => ({
        url: "last-banner",
      }),
      transformResponse: (response) => response.data,
      providesTags: ["Banner"],
    }),
    getBanner: builder.query({
      query: (id) => ({
        url: "banners/" + id,
      }),
      // transformResponse: ({ data }) => response.data,
      providesTags: ["Banner"],
    }),
    createBanner: builder.mutation({
      query(body) {
        return {
          url: "banners",
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["Banner"],
      // transformResponse: ({ data }) => response,
    }),
    updateBanner: builder.mutation({
      query({ id, body }) {
        return {
          url: "banners/" + id,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Banner"],
      // transformResponse: ({ data }) => response,
    }),
    deleteBanner: builder.mutation({
      query({ id, ...body }) {
        return {
          url: "banners/" + id,
          method: "DELETE",
          body,
        };
      },
      invalidatesTags: ["Banner"],
      // transformResponse: ({ data }) => response,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useAllBannersQuery,
  useUpdateBannerMutation,
  useCreateBannerMutation,
  useDeleteBannerMutation,
  useGetBannerQuery,
  useLastBannerQuery,
} = bannerApi;
