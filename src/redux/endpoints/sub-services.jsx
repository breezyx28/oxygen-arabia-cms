// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import API_URL from '../config';
import { prepareHeaders } from '../ApiConfig';

// Define a service using a base URL and expected endpoints
export const subservicesApi = createApi({
  reducerPath: 'subservicesApi',
  tagTypes: ['Subervices'],
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/`, prepareHeaders }),
  endpoints: (builder) => ({
    allSubservices: builder.query({
      query: () => ({
        url: 'subservices',
      }),
      // transformResponse: ({ data }) => response.data,
      providesTags: ['Subervices'],
    }),
    getSubservice: builder.query({
      query: ({ id }) => ({
        url: 'subservices/' + id,
      }),
      transformResponse: (response) => response.data,
      providesTags: ['Subervices'],
    }),
    createSubservice: builder.mutation({
      query(body) {
        return {
          url: 'subservices',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Subervices'],
      // transformResponse: ({ data }) => response,
    }),
    updateSubservice: builder.mutation({
      query({ id, body }) {
        return {
          url: 'subservices/' + id,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Subervices'],
      // transformResponse: ({ data }) => response,
    }),
    deleteSubservice: builder.mutation({
      query({ id, ...body }) {
        return {
          url: 'subservices/' + id,
          method: 'DELETE',
          body,
        };
      },
      invalidatesTags: ['Subervices'],
      // transformResponse: ({ data }) => response,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAllSubservicesQuery, useCreateSubserviceMutation, useDeleteSubserviceMutation, useGetSubserviceQuery, useUpdateSubserviceMutation } = subservicesApi;
