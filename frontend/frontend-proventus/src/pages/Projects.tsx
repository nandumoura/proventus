import ProjectMenuItem from "../components/ProjectsNavbar";
import ProjectsTable from "../components/ProjectsTable";

import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addProject } from "../features/projects/projectsSlice";
import { useEffect, useState } from "react";

const ProjectsPage = () => {
  const projects = useAppSelector((state) => state.project);
  const [projectNames, setProjectNames] = useState<string[]>([]);
  useEffect(() => {
    const names = projects.map((project) => project.name);
    setProjectNames(names);
  }, [projects]);
  //const projectNamesFromStore = ["blog", "site", "youtube"];
  return (
    <section className="">
      <div className="flex justify-between pb-10">
        <h1 className="">Projects Page</h1>
        <button className="px-8 py-2  text-white duration-150 bg-teal-500 rounded-lg hover:bg-teal-600 active:shadow-lg">
          Add Project
        </button>
      </div>

      <div className="">
        <div className="flex  items-center justify-between">
          <h2 className="">Projects List</h2>
          <ProjectMenuItem menuItems={projectNames} />
        </div>

        <ProjectsTable />
      </div>
    </section>
  );
};

export default ProjectsPage;
