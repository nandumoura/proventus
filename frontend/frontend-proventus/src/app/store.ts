import { configureStore } from "@reduxjs/toolkit";
import { projectsApi } from "../services/projectsApi";

import projectReducer from "../features/projects/projectsSlice";
import kanbanReducer from "../features/projects/kanbamSlice";

export const store = configureStore({
  reducer: {
    project: projectReducer,
    kanban: kanbanReducer,
    [projectsApi.reducerPath]: projectsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(projectsApi.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
