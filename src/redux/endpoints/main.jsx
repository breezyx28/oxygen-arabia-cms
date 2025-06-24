// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import API_URL from '../config';
import { prepareHeaders } from '../ApiConfig';
import convertToFormData from 'src/helper/ConvertToFormData';

// Define a service using a base URL and expected endpoints
export const mainApi = createApi({
  reducerPath: 'mainApi',
  tagTypes: ['Main'],
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/`, prepareHeaders }),
  endpoints: (builder) => ({
    allMains: builder.query({
      query: () => ({
        url: 'mains',
      }),
      // transformResponse: ({ data }) => response.data,
      providesTags: ['Main'],
    }),
    lastMain: builder.query({
      query: () => ({
        url: 'last-main',
      }),
      transformResponse: (response) => response.data,
      providesTags: ['Main'],
    }),
    getMain: builder.query({
      query: (id) => ({
        url: 'mains/' + id,
      }),
      // transformResponse: ({ data }) => response.data,
      providesTags: ['Main'],
    }),
    createMain: builder.mutation({
      query(body) {
        return {
          url: 'mains',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Main'],
      // transformResponse: ({ data }) => response,
    }),
    updateMain: builder.mutation({
      query({ id, body }) {
        return {
          url: 'mains/' + id,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Main'],
      // transformResponse: ({ data }) => response,
    }),
    deleteMain: builder.mutation({
      query({ id, ...body }) {
        return {
          url: 'mains/' + id,
          method: 'DELETE',
          body,
        };
      },
      invalidatesTags: ['Main'],
      // transformResponse: ({ data }) => response,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAllMainsQuery, useUpdateMainMutation, useCreateMainMutation, useDeleteMainMutation, useGetMainQuery, useLastMainQuery } = mainApi;
