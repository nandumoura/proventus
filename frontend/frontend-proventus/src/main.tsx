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
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
