// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import API_URL from '../config';
import { prepareHeaders } from '../ApiConfig';

// Define a service using a base URL and expected endpoints
export const footerApi = createApi({
  reducerPath: 'footerApi',
  tagTypes: ['Footer'],
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/`, prepareHeaders }),
  endpoints: (builder) => ({
    allFooters: builder.query({
      query: () => ({
        url: 'footer',
      }),
      transformResponse: (response) => response.data,
      providesTags: ['Footer'],
    }),
    getFooter: builder.query({
      query: (id) => ({
        url: 'footer/' + id,
      }),
      // transformResponse: ({ data }) => response.data,
      providesTags: ['Footer'],
    }),
    lastFooter: builder.query({
      query: () => ({
        url: 'last-footer',
      }),
      transformResponse: (response) => response.data,
      providesTags: ['Footer'],
    }),
    createFooter: builder.mutation({
      query(body) {
        return {
          url: 'footer',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Footer'],
      // transformResponse: ({ data }) => response,
    }),
    updateFooter: builder.mutation({
      query({ id, body }) {
        return {
          url: 'footer/' + id,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['Footer'],
      // transformResponse: ({ data }) => response,
    }),
    deleteFooter: builder.mutation({
      query({ id, ...body }) {
        return {
          url: 'footer/' + id,
          method: 'DELETE',
          body,
        };
      },
      invalidatesTags: ['Footer'],
      // transformResponse: ({ data }) => response,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAllFootersQuery, useLastFooterQuery, useCreateFooterMutation, useDeleteFooterMutation, useGetFooterQuery, useUpdateFooterMutation } = footerApi;
