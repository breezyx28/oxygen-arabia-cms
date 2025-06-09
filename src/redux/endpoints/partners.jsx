// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import API_URL from '../config';
import { prepareHeaders } from '../ApiConfig';

// Define a service using a base URL and expected endpoints
export const partnersApi = createApi({
  reducerPath: 'partnersApi',
  tagTypes: ['Partners'],
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/`, prepareHeaders }),
  endpoints: (builder) => ({
    allPartners: builder.query({
      query: () => ({
        url: 'partners',
      }),
      transformResponse: (response) => response.data,
      providesTags: ['Partners'],
    }),
    getPartner: builder.query({
      query: ({ id }) => ({
        url: 'partners/' + id,
      }),
      transformResponse: (response) => response.data,
      providesTags: ['Partners'],
    }),
    createPartner: builder.mutation({
      query(body) {
        return {
          url: 'partners',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Partners'],
      // transformResponse: ({ data }) => response,
    }),
    updatePartner: builder.mutation({
      query({ id, body }) {
        return {
          url: 'partners/' + id,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Partners'],
      // transformResponse: ({ data }) => response,
    }),
    deletePartner: builder.mutation({
      query({ id, ...body }) {
        return {
          url: 'partners/' + id,
          method: 'DELETE',
          body,
        };
      },
      invalidatesTags: ['Partners'],
      // transformResponse: ({ data }) => response,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAllPartnersQuery, useCreatePartnerMutation, useDeletePartnerMutation, useGetPartnerQuery, useUpdatePartnerMutation } = partnersApi;
