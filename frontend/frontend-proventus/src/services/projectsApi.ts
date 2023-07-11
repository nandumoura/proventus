import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { ProjectState } from "../types/typings";
// Define a service using a base URL and expected endpoints

export const projectsApi = createApi({
  reducerPath: "projects",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/projects" }),
  tagTypes: ["Projects"],
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => `/`,
      transformResponse: (response: {
        success: boolean;
        projects: ProjectState[];
      }) => response.projects,
    }),
    createProject: builder.mutation({
      query: (project: ProjectState) => ({
        url: `/`,
        method: "POST",
        body: project,
      }),
      transformResponse: (response: {
        success: boolean;
        project: ProjectState;
      }) => response.project,
      invalidatesTags: ["Projects"],
    }),
    deleteProject: builder.mutation({
      query: (key: string) => ({
        url: `/${key}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Projects"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints

export const { useGetProjectsQuery, useCreateProjectMutation, useDeleteProjectMutation } = projectsApi;
