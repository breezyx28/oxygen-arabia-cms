// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import API_URL from '../config';
import { prepareHeaders } from '../ApiConfig';

// Define a service using a base URL and expected endpoints
export const servicesApi = createApi({
  reducerPath: 'servicesApi',
  tagTypes: ['Services'],
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/`, prepareHeaders }),
  endpoints: (builder) => ({
    allServices: builder.query({
      query: () => ({
        url: 'services',
      }),
      // transformResponse: ({ data }) => response.data,
      providesTags: ['Services'],
    }),
    getService: builder.query({
      query: ({ id }) => ({
        url: 'services/' + id,
      }),
      transformResponse: (response) => response.data,
      providesTags: ['Services'],
    }),
    createService: builder.mutation({
      query(body) {
        return {
          url: 'services',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Services'],
      // transformResponse: ({ data }) => response,
    }),
    updateService: builder.mutation({
      query({ id, ...body }) {
        return {
          url: 'services/' + id,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['Services'],
      // transformResponse: ({ data }) => response,
    }),
    deleteService: builder.mutation({
      query({ id, ...body }) {
        return {
          url: 'services/' + id,
          method: 'DELETE',
          body,
        };
      },
      invalidatesTags: ['Services'],
      // transformResponse: ({ data }) => response,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAllServicesQuery, useCreateServiceMutation, useDeleteServiceMutation, useGetServiceQuery, useUpdateServiceMutation } = servicesApi;
