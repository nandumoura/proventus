import ProjectsTable from "../components/ProjectsTable";
import { Link } from "react-router-dom";
import { useGetProjectsQuery } from "../services/projectsApi";
import { useEffect } from "react";

const ProjectsPage = () => {
  const {
    data: projects = [],
    isLoading,
    isError,
    refetch,
  } = useGetProjectsQuery("projects");

  useEffect(() => {
    refetch();
  }, [refetch]);

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
        <ProjectsTable projects={projects} />
      </div>
    </section>
  );
};

export default ProjectsPage;
