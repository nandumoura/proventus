
import Sidebar from "./components/Sidebar";

import CreateProject from "./pages/CreateProject";
import ProjectsPage from "./pages/Projects";
import "./App.css";

function App() {
  return (
    <>
      <main className="ml-20 h-screen bg-slate-50 p-10">
        <Sidebar />
        <CreateProject />
<ProjectsPage />
      </main>
    </>
  );
}

export default App;
