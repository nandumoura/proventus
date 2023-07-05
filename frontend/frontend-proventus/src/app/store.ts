import { configureStore } from "@reduxjs/toolkit";

import projectReducer from "../features/projects/projectsSlice";

export const store = configureStore({
  reducer: { project: projectReducer },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;