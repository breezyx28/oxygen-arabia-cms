// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import API_URL from '../config';
import { prepareHeaders } from '../ApiConfig';
import convertToFormData from 'src/helper/ConvertToFormData';

// Define a service using a base URL and expected endpoints
export const heroApi = createApi({
  reducerPath: 'heroApi',
  tagTypes: ['Hero'],
  baseQuery: fetchBaseQuery({ baseUrl: `${API_URL}/`, prepareHeaders }),
  endpoints: (builder) => ({
    allHeroes: builder.query({
      query: () => ({
        url: 'heroes',
      }),
      // transformResponse: ({ data }) => response.data,
      providesTags: ['Hero'],
    }),
    lastHero: builder.query({
      query: () => ({
        url: 'last-hero',
      }),
      transformResponse: (response) => response.data,
      providesTags: ['Hero'],
    }),
    getHero: builder.query({
      query: (id) => ({
        url: 'heroes/' + id,
      }),
      // transformResponse: ({ data }) => response.data,
      providesTags: ['Hero'],
    }),
    createHero: builder.mutation({
      query(body) {
        return {
          url: 'heroes',
          method: 'POST',
          body,
        };
      },
      invalidatesTags: ['Hero'],
      // transformResponse: ({ data }) => response,
    }),
    updateHero: builder.mutation({
      query({ id, body }) {
        return {
          url: 'heroes/' + id,
          method: 'POST',
          body: convertToFormData(body),
        };
      },
      invalidatesTags: ['Hero'],
      // transformResponse: ({ data }) => response,
    }),
    deleteHero: builder.mutation({
      query({ id, ...body }) {
        return {
          url: 'heroes/' + id,
          method: 'DELETE',
          body,
        };
      },
      invalidatesTags: ['Hero'],
      // transformResponse: ({ data }) => response,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAllHeroesQuery, useLastHeroQuery, useCreateHeroMutation, useDeleteHeroMutation, useGetHeroQuery, useUpdateHeroMutation } = heroApi;
