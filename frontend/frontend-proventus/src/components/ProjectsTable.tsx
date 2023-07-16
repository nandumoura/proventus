// src/components/ProjectsTable.js

import TrashIcon from "../icons/trash";
import {
  useDeleteProjectMutation,
  useGetProjectsQuery,
} from "../services/projectsApi";
import { Link } from "react-router-dom";
import { ProjectState } from "../types/typings";
import ViewTimer from "./ViewTimer";
import Alert, { AlertProps } from "./Alert";
import { useState } from "react";

interface Props {
  projects: ProjectState[] | null;
}
type AlertType = AlertProps["type"];

const ProjectsTable = ({ projects }: Props) => {
  const { refetch } = useGetProjectsQuery("projects");
  const [deleteProject] = useDeleteProjectMutation();
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState<AlertType>("SUCCESS");
  const [alertMessage, setAlertMessage] = useState("");

  async function handleDelete(key: string) {
    const result = await deleteProject(key);
    if ("data" in result) {
      setAlertType("SUCCESS");
      setAlertMessage("Project deleted");
      setShowAlert(true);
    } else {
      setAlertType("ERROR");
      setAlertMessage("Something wrong");
      setShowAlert(true);
    }
    refetch();
  }
  function handleCloseAlert() {
    setShowAlert(false);
  }
  return (
    <div className="max-w-screen-xl mx-auto px-4 md:px-8 ">
      <div className="max-w-lg">
        <h3 className="text-gray-800 text-xl font-bold sm:text-2xl">
          Projects
        </h3>
        <p className="text-gray-600 mt-2">
          You can administrate your projects here
        </p>
      </div>
      <Alert
        type={alertType}
        message={alertMessage}
        showAlert={showAlert}
        onCloseAlert={handleCloseAlert}
      />
      <div className="bg-slate-200 mt-12 shadow-lg border rounded-lg overflow-x-auto">
        <table className="w-full table-auto text-sm text-left">
          <thead className="bg-slate-800 text-slate-50 font-medium border-b">
            <tr>
              <th className="py-3 px-6">Project</th>
              <th className="py-3 px-6">Description</th>
              <th className="py-3 px-6">Estimated Time</th>
              <th className="py-3 px-6">Elapsed Time</th>
              <th className="py-3 px-6">Delete</th>
            </tr>
          </thead>
          <tbody className="text-gray-800 divide-y-2 divide-slate-300">
            {projects?.map((project, idx) => (
              <tr key={idx}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Link to={`/project/${project.key}`}> {project.name}</Link>
                </td>
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
