// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import API_URL from '../config';
import { prepareHeaders } from '../ApiConfig';
import localStorageHelper from 'src/helper/localStorageHelper';

// Define a service using a base URL and expected endpoints
export const profileApi = createApi({
  reducerPath: 'profileApi',
  tagTypes: ['Profile'],
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/`, prepareHeaders }),
  endpoints: (builder) => ({
    getCurrentUser: builder.query({
      query: () => ({
        url: 'user',
      }),
      transformResponse: ({ data }) => data,
      providesTags: ['Profile'],
    }),
    updateProfile: builder.mutation({
      query({ id, ...body }) {
        return {
          url: 'user/update',
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['Profile'],
      transformResponse: ({ data }) => data,
      async onQueryStarted(args, { dispatch, queryFulfilled, getState }) {
        try {
          const result = await queryFulfilled;

          console.log('result: ', result);

          if (result?.data) {
            console.log('inside: ', result?.data);

            localStorageHelper({
              key: 'user_data',
              data: { ...result.data, authed: true },
              flag: 'set',
            });
          }
        } catch (error) {

          console.log(error);
        }
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useUpdateProfileMutation, useGetCurrentUserQuery } = profileApi;
