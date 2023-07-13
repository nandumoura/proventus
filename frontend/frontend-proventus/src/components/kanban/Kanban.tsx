import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { useParams, Link, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { ChangeEvent, useEffect, useState, KeyboardEvent } from "react";

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

  const {
    data: tasks,
    error: tasksError,
    isLoading: tasksIsLoading,
    refetch: tasksRefetch,
  } = useGetTasksByProjectIdQuery(projectId);

  const [updateTask] = useUpdateTaskMutation();

  useEffect(() => {
    kanbanRefetch();
  }, [location, kanbanRefetch]);

  if (kanbanError || tasksError) {
    console.error(kanbanError || tasksError);
    return (
      <>An error has occurred! {JSON.stringify(kanbanError || tasksError)}</>
    );
  }

  if (
    tasksIsLoading ||
    kanbanIsLoading ||
    kanban === undefined ||
    projectId === undefined
  ) {
    return <>Loading ...</>;
  }

  const handleAddColumn = async () => {
    if (newColumnTitle.trim() !== "") {
      const newKanbanState = {
        ...kanban,
        columns: [
          ...kanban.columns,
          {
            title: newColumnTitle,
            id: uuidv4(),
          },
        ],
      };

      await updateKanban({ kanban: newKanbanState, projectKey: projectId });
      await kanbanRefetch();
      setNewColumnTitle("");
    }
  };

  const handleRemoveColumn = async (columnId: string) => {
    //verificar se coluna possui tarefas
    if (tasks?.some((task) => task.columnId == columnId)) {
      setShowModalError(true);
    } else {
      const kanbanWithoutColum = removeColumnById(columnId, kanban);
      await updateKanban({ kanban: kanbanWithoutColum, projectKey: projectId });
      await kanbanRefetch();
    }
    return;
  };

  const handleMoveTask = async (targetColumnId: string, taskId: string) => {
    console.log(targetColumnId);
    const taskSelected = tasks?.find((task) => task.key == taskId);

    if (taskSelected === undefined) {
      return;
    } else {
      /* eslint-disable  @typescript-eslint/no-non-null-assertion */
      const taskUpdated = { ...taskSelected!, columnId: targetColumnId };
      updateTask(taskUpdated);
      kanbanRefetch();
      tasksRefetch();
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
  function testReload() {
    return;
  }
  return (
    <DndProvider backend={HTML5Backend}>
      <Modal
        title="Cuidado"
        description="Voce deve mover as tarefas antes de excluir colunas"
        showModal={showModalError}
      />
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
                setEditmode(!editMode);
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
                setEditmode(!editMode);
              }}
            >
              <EditIcon /> <span className="ml-2">Edit mode</span>
            </button>
          </div>
        )}
      </div>
      <div className="flex justify-between bg-slate-200 p-2">
        {kanban.columns.map((column, idx) => {
          return (
            <TaskColumn
              reloadTaskColumn={testReload}
              key={idx}
              column={column}
              editMode={editMode}
              onItemDrop={handleMoveTask}
              onRemove={handleRemoveColumn}
            />
          );
        })}
      </div>
    </DndProvider>
  );
}
