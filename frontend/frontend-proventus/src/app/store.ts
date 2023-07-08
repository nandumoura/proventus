import { configureStore } from "@reduxjs/toolkit";

import projectReducer from "../features/projects/projectsSlice";
import kanbanReducer from "../features/projects/kanbamSlice";

export const store = configureStore({
  reducer: { project: projectReducer, kanban: kanbanReducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
