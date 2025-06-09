// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import API_URL from '../config';
import { prepareHeaders } from '../ApiConfig';
import convertToFormData from 'src/helper/ConvertToFormData';

// Define a service using a base URL and expected endpoints
export const aboutPageDetailsApi = createApi({
  reducerPath: 'aboutPageDetailsApi',
  tagTypes: ['AboutPageDetails'],
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/`, prepareHeaders }),
  endpoints: (builder) => ({
    allAboutPageDetails: builder.query({
      query: () => ({
        url: 'about-page',
      }),
      transformResponse: (response) => response.data,
      providesTags: ['AboutPageDetails'],
    }),
    lastAboutPageDetail: builder.query({
      query: () => ({
        url: 'last-about-page',
      }),
      transformResponse: (response) => response.data,
      providesTags: ['AboutPageDetails'],
    }),
    getAboutPageDetails: builder.query({
      query: (id) => ({
        url: 'about-page/' + id,
      }),
      // transformResponse: ({ data }) => response.data,
      providesTags: ['AboutPageDetails'],
    }),
    createAboutPageDetails: builder.mutation({
      query(body) {
        return {
          url: 'about-page',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['AboutPageDetails'],
      // transformResponse: ({ data }) => response,
    }),
    updateAboutPageDetails: builder.mutation({
      query({ id, body }) {
        return {
          url: 'about-page/' + id,
          method: 'POST',
          body: convertToFormData(body),
        };
      },
      invalidatesTags: ['AboutPageDetails'],
      // transformResponse: ({ data }) => response,
    }),
    deleteAboutPageDetails: builder.mutation({
      query({ id, ...body }) {
        return {
          url: 'about-page/' + id,
          method: 'DELETE',
          body,
        };
      },
      invalidatesTags: ['AboutPageDetails'],
      // transformResponse: ({ data }) => response,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAllAboutPageDetailsQuery, useLastAboutPageDetailQuery, useCreateAboutPageDetailsMutation, useDeleteAboutPageDetailsMutation, useGetAboutPageDetailsQuery, useUpdateAboutPageDetailsMutation } = aboutPageDetailsApi;
