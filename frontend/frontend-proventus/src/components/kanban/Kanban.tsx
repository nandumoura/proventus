import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { useParams, Link, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import {
  ChangeEvent,
  useEffect,
  useState,
  KeyboardEvent,
  useCallback,
  useMemo,
} from "react";

import TaskColumn from "./ColumnTasks";

import {
  useGetKanbanQuery,
  useUpdateKanbanMutation,
} from "../../services/kanbanApi";

import {
  useGetTasksByProjectIdQuery,
  useUpdateTaskMutation,
} from "../../services/tasksApi";

import { removeColumnById } from "../../utils/utils";
import SquaresPlus from "../../icons/SquaresPlus";
import EditIcon from "../../icons/Edit";
import Modal from "../Modal";

import { sendErrorLogs } from "../../services/errorLogsApi";

export default function Kanban() {
  const location = useLocation();

  const [editMode, setEditmode] = useState(false);
  const [showModalError, setShowModalError] = useState(false);
  const [newColumnTitle, setNewColumnTitle] = useState("");

  const { projectId } = useParams();
  const [updateKanban] = useUpdateKanbanMutation();

  const {
    data: kanban,
    error: kanbanError,
    isLoading: kanbanIsLoading,
    refetch: kanbanRefetch,
  } = useGetKanbanQuery(projectId);

  kanbanError && sendErrorLogs("kanbanError", kanbanError);

  const {
    data: tasks,
    error: tasksError,
    isLoading: tasksIsLoading,
    // refetch: tasksRefetch,
  } = useGetTasksByProjectIdQuery(projectId);

  tasksError && sendErrorLogs("tasksError", tasksError);

  const [updateTask] = useUpdateTaskMutation();

  useEffect(() => {
    kanbanRefetch();
  }, [location, kanbanRefetch]);

  const columns = useMemo(() => kanban?.columns || [], [kanban]);

  const handleAddColumn = useCallback(async () => {
    if (newColumnTitle.trim() !== "") {
      const newKanbanState = {
        /* eslint-disable  @typescript-eslint/no-non-null-assertion */
        ...kanban!,
        columns: [
          /* eslint-disable  @typescript-eslint/no-non-null-assertion */
          ...kanban!.columns,
          {
            title: newColumnTitle,
            id: uuidv4(),
          },
        ],
      };

      await updateKanban({ kanban: newKanbanState, projectKey: projectId! });
      await kanbanRefetch();
      setNewColumnTitle("");
    }
  }, [kanban, newColumnTitle, projectId, updateKanban, kanbanRefetch]);

  const handleRemoveColumn = async (columnId: string) => {
    //verificar se coluna possui tarefas
    if (tasks?.some((task) => task.columnId == columnId)) {
      setShowModalError(true);
    } else {
      const kanbanWithoutColum = removeColumnById(columnId, kanban!);
      await updateKanban({
        kanban: kanbanWithoutColum,
        projectKey: projectId!,
      });
      await kanbanRefetch();
    }
    return;
  };

  const handleMoveTask = async (targetColumnId: string, taskId: string) => {
    const taskSelected = tasks?.find((task) => task.key == taskId);

    if (taskSelected === undefined) {
      return;
    } else {
      /* eslint-disable  @typescript-eslint/no-non-null-assertion */
      const taskUpdated = { ...taskSelected!, columnId: targetColumnId };
      await updateTask(taskUpdated);
    }
  };

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setNewColumnTitle(event.target.value);
  }
  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // Chamando a função desejada quando a tecla Enter for pressionada
      handleAddColumn();
    }
  };
  function reloadKanban() {
    kanbanRefetch();
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <Modal
        title="Cuidado"
        description="Você deve mover as tarefas antes de excluir colunas"
        showModal={showModalError}
      />
      {kanbanIsLoading || tasksIsLoading || !kanban ? (
        <>Loading ...</>
      ) : (
        <>
          <div className="header flex justify-between bg-slate-100 p-2">
            <h2 className="flex items-center font-bold text-2xl text-gray-800">
              Kanban
            </h2>
            {editMode ? (
              <div className="flex ">
                <input
                  className="mx-4 h-full p-2 rounded-lg "
                  value={newColumnTitle}
                  placeholder="type new column name here..."
                  onChange={handleInputChange}
                  onKeyDown={handleKeyPress}
                  type="text"
                />
                <button
                  className="bg-slate-700 text-slate-50 hover:bg-slate-300 hover:text-slate-900 p-2 h-full rounded-lg shadow "
                  onClick={handleAddColumn}
                >
                  <SquaresPlus />
                </button>
                <button
                  className="flex bg-teal-700 text-slate-50 ml-2 hover:bg-teal-400 hover:text-slate-900 p-2 h-full rounded-lg shadow "
                  onClick={() => {
                    setEditmode((prevEditMode) => !prevEditMode);
                  }}
                >
                  <EditIcon /> <span className="ml-2">Close edit mode</span>
                </button>
              </div>
            ) : (
              <div className="flex">
                <Link
                  to={`/project/${projectId}/addtask`}
                  className="flex bg-teal-600 mr-2 text-slate-50 hover:bg-teal-400 hover:text-slate-900 p-2 h-full rounded-lg shadow "
                >
                  <EditIcon /> <span className="ml-2">Add Task </span>
                </Link>
                <button
                  className="flex bg-red-500 text-slate-50 hover:bg-red-300 hover:text-slate-900 p-2 h-full rounded-lg shadow "
                  onClick={() => {
                    setEditmode((prevEditMode) => !prevEditMode);
                  }}
                >
                  <EditIcon /> <span className="ml-2">Edit mode</span>
                </button>
              </div>
            )}
          </div>
          <div className="flex flex-wrap justify-between  bg-slate-200 p-2">
            {columns.map((column, idx) => (
              <TaskColumn
                reloadTaskColumn={reloadKanban}
                key={idx}
                column={column}
                editMode={editMode}
                onItemDrop={handleMoveTask}
                onRemove={handleRemoveColumn}
              />
            ))}
          </div>
        </>
      )}
    </DndProvider>
  );
}
