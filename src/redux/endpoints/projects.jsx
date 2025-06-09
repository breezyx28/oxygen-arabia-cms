// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import API_URL from '../config';
import { prepareHeaders } from '../ApiConfig';

// Define a service using a base URL and expected endpoints
export const projectsApi = createApi({
  reducerPath: 'projectsApi',
  tagTypes: ['Projects'],
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/`, prepareHeaders }),
  endpoints: (builder) => ({
    allProjects: builder.query({
      query: () => ({
        url: 'projects',
      }),
      transformResponse: (response) => response.data,
      providesTags: ['Projects'],
    }),
    getProject: builder.query({
      query: ({ id }) => ({
        url: 'projects/' + id,
      }),
      transformResponse: (response) => response.data,
      providesTags: ['Projects'],
    }),
    createProject: builder.mutation({
      query(body) {
        return {
          url: 'projects',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Projects'],
      // transformResponse: ({ data }) => response,
    }),
    updateProject: builder.mutation({
      query({ id, body }) {
        return {
          url: 'projects/' + id,
          method: 'PUT',
          body,
        };
      },
      invalidatesTags: ['Projects'],
      // transformResponse: ({ data }) => response,
    }),
    deleteProject: builder.mutation({
      query({ id, ...body }) {
        return {
          url: 'projects/' + id,
          method: 'DELETE',
          body,
        };
      },
      invalidatesTags: ['Projects'],
      // transformResponse: ({ data }) => response,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAllProjectsQuery, useCreateProjectMutation, useDeleteProjectMutation, useGetProjectQuery, useUpdateProjectMutation } = projectsApi;
