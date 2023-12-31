import { configureStore } from "@reduxjs/toolkit";
import { projectsApi } from "../services/projectsApi";
import { kanbanApi } from "../services/kanbanApi";
import { tasksApi } from "../services/tasksApi";

export const store = configureStore({
  reducer: {
    [tasksApi.reducerPath]: tasksApi.reducer,
    [kanbanApi.reducerPath]: kanbanApi.reducer,
    [projectsApi.reducerPath]: projectsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(projectsApi.middleware)
      .concat(kanbanApi.middleware)
      .concat(tasksApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
