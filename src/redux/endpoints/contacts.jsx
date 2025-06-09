// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import API_URL from '../config';
import { prepareHeaders } from '../ApiConfig';

// Define a service using a base URL and expected endpoints
export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  tagTypes: ['Contacts'],
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/`, prepareHeaders }),
  endpoints: (builder) => ({
    allContacts: builder.query({
      query: () => ({
        url: 'contacts',
      }),
      transformResponse: (response) => response.data,
      providesTags: ['Contacts'],
    }),
    lastContact: builder.query({
      query: () => ({
        url: 'last-contact',
      }),
      transformResponse: (response) => response.data,
      providesTags: ['Contacts'],
    }),
    getContact: builder.query({
      query: (id) => ({
        url: 'contacts/' + id,
      }),
      // transformResponse: ({ data }) => response.data,
      providesTags: ['Contacts'],
    }),
    createContact: builder.mutation({
      query(body) {
        return {
          url: 'contacts',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Contacts'],
      // transformResponse: ({ data }) => response,
    }),
    updateContact: builder.mutation({
      query({ id, ...body }) {
        return {
          url: 'contacts/' + id,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['Contacts'],
      // transformResponse: ({ data }) => response,
    }),
    deleteContact: builder.mutation({
      query({ id, ...body }) {
        return {
          url: 'contacts/' + id,
          method: 'DELETE',
          body,
        };
      },
      invalidatesTags: ['Contacts'],
      // transformResponse: ({ data }) => response,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAllContactsQuery, useLastContactQuery, useCreateContactMutation, useDeleteContactMutation, useGetContactQuery, useUpdateContactMutation } = contactsApi;
