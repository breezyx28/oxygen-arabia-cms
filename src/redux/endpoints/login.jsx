// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import localStorageHelper from '../../helper/localStorageHelper';
import API_URL from '../config';
import { prepareHeaders } from '../ApiConfig';

// Define a service using a base URL and expected endpoints
export const loginApi = createApi({
  reducerPath: 'loginApi',
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/`, prepareHeaders }),
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query(body) {
        return {
          url: 'login',
          method: 'POST',
          body,
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled, getState }) {
        try {
          const result = await queryFulfilled;

          if (result?.data?.data?.token) {
            console.log('inside: ', result?.data?.data);

            // Wrap localStorageHelper in a Promise to ensure it completes
            await new Promise((resolve, reject) => {
              try {
                localStorageHelper({
                  key: 'user_data',
                  data: { ...result.data.data, authed: true },
                  flag: 'set',
                });
                resolve(true); // Resolve the promise if storage is successful
              } catch (error) {
                reject(error); // Reject the promise if storage fails
              }
            });

            console.log('Data stored successfully in localStorage');
            // Continue with any additional logic after successful storage
          }
        } catch (error) {
          // Handle specific unauthorized error
          if (error?.error?.message === 'This action is unauthorized.') {
            // Optionally clear local storage and redirect
            localStorageHelper({ key: 'user_data', flag: 'remove' });
            window.location.href = '/login';
          }
          console.error('Error during login:', error);
        }
      },
    }),
    createUser: builder.mutation({
      query(body) {
        return {
          url: 'user/create',
          method: 'POST',
          body,
        };
      },
    }),
    getCounties: builder.query({
      query: () => ({
        url: 'user/country',
      }),
      // transformResponse: ({ data }, meta, arg) => response,
    }),
    getCountiesWithCode: builder.query({
      query: () => ({
        url: 'user/country/code',
      }),
      // // transformResponse: ({ data }, meta, arg) => response,
    }),
    logoutUser: builder.mutation({
      query() {
        return {
          url: 'logout',
          method: 'POST',
          headers: {
            authorization: `Bearer ${localStorageHelper({ key: 'user_data', flag: 'get' })?.token}`,
          },
        };
      },
      async onQueryStarted(args, { queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          if (result?.data?.data?.success === true) {
            // localStorage.clear();
            localStorageHelper({ key: 'user_data', flag: 'remove' });
            window.location.href = '/login';
          }
        } catch (error) {
          console.log(error);
          localStorageHelper({ key: 'user_data', flag: 'remove' });
          window.location.href = '/login';
        }
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useLoginUserMutation,
  useCreateUserMutation,
  useLogoutUserMutation,
  useGetCountiesQuery,
  useGetCountiesWithCodeQuery,
} = loginApi;
