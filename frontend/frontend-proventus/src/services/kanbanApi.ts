import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Kanban } from "../types/typings";

interface AddColumnPayload {
  kanban: Kanban;
  projectKey: string;
}

export const kanbanApi = createApi({
  reducerPath: "kanban",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/kanban" }),
  tagTypes: ["Kanban"],
  endpoints: (builder) => ({
    getKanban: builder.query({
      query: (key) => `/${key}`,
      transformResponse: (response: { success: boolean; kanban: Kanban }) =>
        response.kanban,
    }),
    updateKanban: builder.mutation({
      query: ({ kanban, projectKey }: AddColumnPayload) => ({
        url: `/${projectKey}`,
        method: "PUT",
        body: kanban,
      }),
      invalidatesTags: ["Kanban"],
    }),
  }),
});

export const { useGetKanbanQuery, useUpdateKanbanMutation } = kanbanApi;
