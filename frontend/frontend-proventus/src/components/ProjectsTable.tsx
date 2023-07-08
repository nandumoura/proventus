import { ProjectState } from "../features/projects/projectsSlice";
import Kanban from "../components/kanban/Kanban"

interface Props {
  project: ProjectState | null;
}

const tasks = [
  {
    id: "1",
    name: "Criar footer",
    projectId: "1",
    timeSpend: 0,
  },
  {
    id: "2",
    name: "Criar banner",
    projectId: "2",
    timeSpend: 0,
  },
  {
    id: "3",
    name: "pagar conta de servidor",
    projectId: "3",
    timeSpend: 0,
  },
  {
    id: "4",
    name: "Criar site do joão",
    projectId: "1",
    timeSpend: 0,
  },
  {
    id: "5",
    name: "Criar site",
    projectId: "1",
    timeSpend: 0,
  },
];
const ProjectsTable = ({ project }: Props) => {
  console.log("carregou projects table")
  return (
    <div>
      <h2>Titulo: {project?.name}</h2>
      <p>Descrição: {project?.description}</p>
      <p>Tempo Estimado: {project?.estimatedTime} horas</p>
      <Kanban tasks={tasks}/>
    </div>
  );
};

export default ProjectsTable;
