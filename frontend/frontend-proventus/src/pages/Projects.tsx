import ProjectMenuItem from "../components/ProjectsNavbar";
import ProjectsTable from "../components/ProjectsTable";
import { Link } from "react-router-dom";
import { useGetProjectsQuery } from "../services/projectsApi";

import { ProjectState } from "../types/typings";

import { useEffect, useState } from "react";

const ProjectsPage = () => {
  console.log("Carregou Projects page");
  const {
    data: projects = [],
    isLoading,
    isError,
    refetch,
  } = useGetProjectsQuery("projects");
  const [projectNames, setProjectNames] = useState<string[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectState | null>(
    null
  );

  useEffect(() => {
    const names = projects.map((project) => project.name);
    setProjectNames(names);

  }, [projects]);

  useEffect(()=>{
    refetch();
  },[])

  function selectedItemPropDrilling(item: string | null) {
    if (item !== null) {
      const project = projects.filter(
        (project: ProjectState) => project.name === item
      );
      setSelectedProject(project[0]);
    }
  }
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error occurred while fetching projects.</p>;
  }
  return (
    <section className="">
      <div className="flex justify-between pb-10">
        <h1 className="">Projects Page</h1>
        <Link
          to="/create-project"
          className="px-8 py-2  text-white duration-150 bg-teal-500 rounded-lg hover:bg-teal-600 active:shadow-lg"
        >
          Add Project
        </Link>
      </div>

      <div className="">
        <div className="flex  items-center justify-between">
          <h2 className="">Projects List</h2>
          <ProjectMenuItem
            selectedItemPropDrilling={selectedItemPropDrilling}
            menuItems={projectNames}
          />
        </div>

        <ProjectsTable project={selectedProject} />
      </div>
    </section>
  );
};

export default ProjectsPage;
