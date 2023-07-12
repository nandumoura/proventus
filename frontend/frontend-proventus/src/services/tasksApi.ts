import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Task } from "../types/typings";

export const tasksApi = createApi({
  reducerPath: "tasks",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/tasks/" }),
  tagTypes: ["Tasks"],
  endpoints: (builder) => ({
    getTasksByProjectId: builder.query({
      query: (projectId) => `/project/${projectId}`,
      transformResponse: (response: {
        success: boolean;
        tasks: Task[];
      }) => response.tasks,
    }),
  }),
});

export const { useGetTasksByProjectIdQuery } = tasksApi;
