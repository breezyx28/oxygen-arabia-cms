// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import API_URL from '../config';
import { prepareHeaders } from '../ApiConfig';

// Define a service using a base URL and expected endpoints
export const missionsApi = createApi({
  reducerPath: 'missionsApi',
  tagTypes: ['Missions'],
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/`, prepareHeaders }),
  endpoints: (builder) => ({
    allMissions: builder.query({
      query: () => ({
        url: 'missions',
      }),
      transformResponse: (response) => response.data,
      providesTags: ['Missions'],
    }),
    getMission: builder.query({
      query: ({ id }) => ({
        url: 'missions/' + id,
      }),
      transformResponse: (response) => response.data,
      providesTags: ['Missions'],
    }),
    createMission: builder.mutation({
      query(body) {
        return {
          url: 'missions',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Missions'],
      // transformResponse: ({ data }) => response,
    }),
    updateMission: builder.mutation({
      query({ id, ...body }) {
        return {
          url: 'missions/' + id,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['Missions'],
      // transformResponse: ({ data }) => response,
    }),
    deleteMission: builder.mutation({
      query({ id, ...body }) {
        return {
          url: 'missions/' + id,
          method: 'DELETE',
          body,
        };
      },
      invalidatesTags: ['Missions'],
      // transformResponse: ({ data }) => response,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAllMissionsQuery, useCreateMissionMutation, useDeleteMissionMutation, useGetMissionQuery, useUpdateMissionMutation } = missionsApi;
