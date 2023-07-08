import { ReactNode } from "react";
import Sidebar from "./Sidebar";

interface AppProps {
  children: ReactNode;
}

const App = ({ children }: AppProps) => {
  return (
    <main className="ml-20 h-screen bg-slate-50 p-10">
      <Sidebar />
      {children}
    </main>
  );
};

export default App;