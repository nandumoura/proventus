import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProjectState } from "../features/projects/projectsSlice";
// Define a service using a base URL and expected endpoints
export const projectsApi = createApi({
  reducerPath: "projects",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:4202/projects" }),
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => `/`,
      transformResponse: (response: {success: boolean, projects: ProjectState[]})=> response.projects,
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetProjectsQuery } = projectsApi;
