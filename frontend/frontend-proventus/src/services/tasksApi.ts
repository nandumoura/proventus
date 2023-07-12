import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Task } from "../types/typings";

interface AddTaskPayload {
  task: Task;
  projectId: string;
}

export const tasksApi = createApi({
  reducerPath: "tasks",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/tasks/" }),
  tagTypes: ["Tasks"],
  endpoints: (builder) => ({
    getTasksByProjectId: builder.query({
      query: (projectId) => `/project/${projectId}`,
      transformResponse: (response: { success: boolean; tasks: Task[] }) =>
        response.tasks,
    }),
    addTask: builder.mutation({
      query: (payload: AddTaskPayload) => ({
        url: `/${payload.projectId}`,
        method: "POST",
        body: payload.task,
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const { useGetTasksByProjectIdQuery, useAddTaskMutation } = tasksApi;
