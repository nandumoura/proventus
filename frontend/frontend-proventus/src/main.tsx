import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

//state
import { Provider } from "react-redux";
import { store } from "./app/store.ts";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./components/App.tsx";
import CreateProject from "./pages/CreateProject.tsx";
import ProjectsPage from "./pages/Projects.tsx";
import Kanban from "./components/kanban/Kanban.tsx";
import ErrorBoundary from "./pages/ErrorBoundary.tsx";
import AddTaskPage from "./pages/AddTask.tsx";
import EditTask from "./pages/EditTask.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <App>
        <ProjectsPage />
      </App>
    ),
  },
  {
    path: "/create-project",
    element: (
      <App>
        <CreateProject />
      </App>
    ),
  },
  {
    path: "/project/:projectId",
    element: (
      <App>
        <Kanban />
      </App>
    ),
  },
  {
    path: "/project/:projectId/addtask",
    element: (
      <App>
        <AddTaskPage />
      </App>
    ),
  },
  {
    path: "/project/:projectId/edittask/:taskId",
    element: (
      <App>
        <EditTask />
      </App>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
