// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import API_URL from '../config';
import { prepareHeaders } from '../ApiConfig';

// Define a service using a base URL and expected endpoints
export const contactPageDetailsApi = createApi({
  reducerPath: 'contactPageDetailsApi',
  tagTypes: ['ContactPageDetails'],
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/`, prepareHeaders }),
  endpoints: (builder) => ({
    allContactPageDetails: builder.query({
      query: () => ({
        url: 'contact-page',
      }),
      transformResponse: (response) => response.data,
      providesTags: ['ContactPageDetails'],
    }),
    lastContactPageDetail: builder.query({
      query: () => ({
        url: 'last-contact-page',
      }),
      transformResponse: (response) => response.data,
      providesTags: ['ContactPageDetails'],
    }),
    getContactPageDetails: builder.query({
      query: (id) => ({
        url: 'contact-page/' + id,
      }),
      // transformResponse: ({ data }) => response.data,
      providesTags: ['ContactPageDetails'],
    }),
    createContactPageDetails: builder.mutation({
      query(body) {
        return {
          url: 'contact-page',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['ContactPageDetails'],
      // transformResponse: ({ data }) => response,
    }),
    updateContactPageDetails: builder.mutation({
      query({ id, ...body }) {
        return {
          url: 'contact-page/' + id,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['ContactPageDetails'],
      // transformResponse: ({ data }) => response,
    }),
    deleteContactPageDetails: builder.mutation({
      query({ id, ...body }) {
        return {
          url: 'contact-page/' + id,
          method: 'DELETE',
          body,
        };
      },
      invalidatesTags: ['ContactPageDetails'],
      // transformResponse: ({ data }) => response,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAllContactPageDetailsQuery, useLastContactPageDetailQuery, useCreateContactPageDetailsMutation, useDeleteContactPageDetailsMutation, useGetContactPageDetailsQuery, useUpdateContactPageDetailsMutation } = contactPageDetailsApi;
