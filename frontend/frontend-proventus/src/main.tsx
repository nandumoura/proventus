import React, { ReactNode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

//state
import { Provider } from "react-redux";
import { store } from "./app/store.ts";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Sidebar from "./components/Sidebar.tsx";
import CreateProject from "./pages/CreateProject.tsx";
import ProjectsPage from "./pages/Projects.tsx";

interface MainProps {
  children: ReactNode;
}

const Main = ({ children }: MainProps) => {
  return (
    <main className="ml-20 h-screen bg-slate-50 p-10">
      <Sidebar />
      {children}
    </main>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Main>
        <ProjectsPage />
      </Main>
    ),
  },
  {
    path: "/create-project",
    element: (
      <Main>
        <CreateProject />
      </Main>
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
