// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import API_URL from '../config';
import { prepareHeaders } from '../ApiConfig';

// Define a service using a base URL and expected endpoints
export const projectPageDetailsApi = createApi({
  reducerPath: 'projectPageDetailsApi',
  tagTypes: ['ProjectPageDetails'],
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/`, prepareHeaders }),
  endpoints: (builder) => ({
    allProjectPageDetails: builder.query({
      query: () => ({
        url: 'project-page',
      }),
      transformResponse: (response) => response.data,
      providesTags: ['ProjectPageDetails'],
    }),
    lastProjectPageDetail: builder.query({
      query: () => ({
        url: 'last-project-page',
      }),
      transformResponse: (response) => response.data,
      providesTags: ['ContactPageDetails'],
    }),
    getProjectPageDetail: builder.query({
      query: ({ id }) => ({
        url: 'project-page/' + id,
      }),
      transformResponse: (response) => response.data,
      providesTags: ['ProjectPageDetails'],
    }),
    createProjectPageDetails: builder.mutation({
      query(body) {
        return {
          url: 'project-page',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['ProjectPageDetails'],
      // transformResponse: ({ data }) => response,
    }),
    updateProjectPageDetails: builder.mutation({
      query({ id, ...body }) {
        return {
          url: 'project-page/' + id,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['ProjectPageDetails'],
      // transformResponse: ({ data }) => response,
    }),
    deleteProjectPageDetails: builder.mutation({
      query({ id, ...body }) {
        return {
          url: 'project-page/' + id,
          method: 'DELETE',
          body,
        };
      },
      invalidatesTags: ['ProjectPageDetails'],
      // transformResponse: ({ data }) => response,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAllProjectPageDetailsQuery, useLastProjectPageDetailQuery, useCreateProjectPageDetailsMutation, useDeleteProjectPageDetailsMutation, useGetProjectPageDetailQuery, useUpdateProjectPageDetailsMutation } = projectPageDetailsApi;
