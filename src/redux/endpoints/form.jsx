// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import API_URL from '../config';
import { prepareHeaders } from '../ApiConfig';

// Define a service using a base URL and expected endpoints
export const formApi = createApi({
  reducerPath: 'formApi',
  tagTypes: ['Form'],
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/`, prepareHeaders }),
  endpoints: (builder) => ({
    allForms: builder.query({
      query: () => ({
        url: 'forms',
      }),
      // transformResponse: ({ data }) => response.data,
      providesTags: ['Form'],
    }),
    lastForm: builder.query({
      query: () => ({
        url: 'last-form',
      }),
      transformResponse: (response) => response.data,
      providesTags: ['Form'],
    }),
    getForm: builder.query({
      query: (id) => ({
        url: 'forms/' + id,
      }),
      // transformResponse: ({ data }) => response.data,
      providesTags: ['Form'],
    }),
    createForm: builder.mutation({
      query(body) {
        return {
          url: 'forms',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Form'],
      // transformResponse: ({ data }) => response,
    }),
    updateForm: builder.mutation({
      query({ id, body }) {
        return {
          url: 'forms/' + id,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Form'],
      // transformResponse: ({ data }) => response,
    }),
    deleteForm: builder.mutation({
      query({ id, ...body }) {
        return {
          url: 'forms/' + id,
          method: 'DELETE',
          body,
        };
      },
      invalidatesTags: ['Form'],
      // transformResponse: ({ data }) => response,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAllFormsQuery, useUpdateFormMutation, useCreateFormMutation, useDeleteFormMutation, useGetFormQuery, useLastFormQuery } = formApi;
