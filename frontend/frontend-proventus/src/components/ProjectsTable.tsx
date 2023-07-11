// src/components/ProjectsTable.js

import TrashIcon from "../icons/trash";
import {
  useDeleteProjectMutation,
  useGetProjectsQuery,
} from "../services/projectsApi";
import { ProjectState } from "../types/typings";
import ViewTimer from "./ViewTimer";

interface Props {
  projects: ProjectState[] | null;
}

const ProjectsTable = ({ projects }: Props) => {
  const { refetch } = useGetProjectsQuery("projects");

  const [deleteProject] = useDeleteProjectMutation();

  function handleDelete(key: string) {
    deleteProject(key);
    refetch();
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8">
      <div className="max-w-lg">
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
          Projects
        </h3>
        <p className="text-gray-600 mt-2">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry.
        </p>
      </div>
      <div className="mt-12 shadow-sm border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-gray-50 text-gray-600 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Project</th>
              <th className="py-3 px-6">Description</th>
              <th className="py-3 px-6">Estimated Time</th>
              <th className="py-3 px-6">Elapsed Time</th>
              <th className="py-3 px-6">Delete</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 divide-y">
            {projects?.map((project, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap">{project.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {project.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <ViewTimer timer={project.estimatedTime} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <ViewTimer timer={project.elapsedTime} />
                </td>
                <td className="px-6 py-4 text-red-500 whitespace-nowrap">
                  {/* eslint-disable  @typescript-eslint/no-non-null-assertion */}
                  <button onClick={() => handleDelete(project.key!)}>
                    <TrashIcon />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectsTable;
