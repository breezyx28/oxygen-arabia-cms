// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import API_URL from '../config';
import { prepareHeaders } from '../ApiConfig';

// Define a service using a base URL and expected endpoints
export const statisticsApi = createApi({
  reducerPath: 'statisticsApi',
  tagTypes: ['Statistics'],
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/`, prepareHeaders }),
  endpoints: (builder) => ({
    allStatistics: builder.query({
      query: () => ({
        url: 'statistics',
      }),
      transformResponse: (response) => response.data,
      providesTags: ['Statistics'],
    }),

  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAllStatisticsQuery } = statisticsApi;
