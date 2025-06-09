// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import API_URL from '../config';
import { prepareHeaders } from '../ApiConfig';

// Define a service using a base URL and expected endpoints
export const usersMessagesApi = createApi({
  reducerPath: 'usersMessagesApi',
  tagTypes: ['UsersMessages'],
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/`, prepareHeaders }),
  endpoints: (builder) => ({
    allUsersMessages: builder.query({
      query: () => ({
        url: 'users-messages',
      }),
      // transformResponse: (response) => response.data,
      providesTags: ['UsersMessages'],
    }),
    getUsersMessage: builder.query({
      query: (id) => ({
        url: 'users-messages/' + id,
      }),
      // transformResponse: ({ data }) => response.data,
      providesTags: ['UsersMessages'],
    }),
    createUsersMessage: builder.mutation({
      query(body) {
        return {
          url: 'users-messages',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['UsersMessages'],
      // transformResponse: ({ data }) => response,
    }),
    updateUsersMessage: builder.mutation({
      query({ id, ...body }) {
        return {
          url: 'users-messages/' + id,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['UsersMessages'],
      // transformResponse: ({ data }) => response,
    }),
    deleteUsersMessage: builder.mutation({
      query({ id, ...body }) {
        return {
          url: 'users-messages/' + id,
          method: 'DELETE',
          body,
        };
      },
      invalidatesTags: ['UsersMessages'],
      // transformResponse: ({ data }) => response,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAllUsersMessagesQuery, useCreateUsersMessageMutation, useDeleteUsersMessageMutation, useGetUsersMessageQuery, useUpdateUsersMessageMutation } = usersMessagesApi;
