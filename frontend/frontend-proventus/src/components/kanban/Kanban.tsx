import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { useParams, Link, useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { ChangeEvent, useEffect, useState, KeyboardEvent } from "react";
import { Task } from "../../types/typings";
import TaskColumn from "./ColumnTasks";

import {
  useGetKanbanQuery,
  useUpdateKanbanMutation,
} from "../../services/kanbanApi";
import { useGetTasksByProjectIdQuery } from "../../services/tasksApi";
import { removeColumnById } from "../../utils/utils";
import SquaresPlus from "../../icons/SquaresPlus";
import EditIcon from "../../icons/Edit";

export interface KanbanProps {
  tasks: Task[];
}

export default function Kanban() {
  let location = useLocation();

  const [editMode, setEditmode] = useState(false);
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
    refetch,
  } = useGetTasksByProjectIdQuery(projectId);

  useEffect(() => {
    refetch();
  }, [location]);

  if (kanbanError || tasksError) {
    console.error(tasksError || kanbanError);
    return (
      <>An error has occurred! {JSON.stringify(tasksError || kanbanError)}</>
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
  // eslint-disable-next-line no-unused-vars
  const { key, ...kanbanWithoutKey } = kanban; // Remove the key property from object to avoid receive this in backend ocurrs an error

  const handleAddColumn = async () => {
    if (newColumnTitle.trim() !== "") {
      const newKanbanState = {
        ...kanbanWithoutKey,
        columns: [
          ...kanbanWithoutKey.columns,
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
    // dispatch(removeColumn(columnTitle));
    const kanbanWithoutColum = removeColumnById(columnId, kanbanWithoutKey);
    await updateKanban({ kanban: kanbanWithoutColum, projectKey: projectId });
    await kanbanRefetch();
  };

  // const handleAddTask = (columnTitle: string) => {
  //   const task: Task = {
  //     id: Math.random().toString(36).substring(7),
  //     name: "New Task",
  //     projectId: "1",
  //     timeSpend: 0,
  //   };
  //   dispatch(addTask(columnTitle, task));
  // };

  const handleMoveTask = (targetColumnTitle: string, taskId: string) => {
    // dispatch(moveTask({ targetColumnTitle, taskId }));
  };

  // useEffect(() => {
  //   dispatch(addColumn("Tarefas"));
  //   tasks.map((task) => {
  //     dispatch(addTask({ columnTitle: "Tarefas", task }));
  //   });
  // }, [dispatch, tasks]);

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    setNewColumnTitle(event.target.value);
  }
  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      // Chamando a função desejada quando a tecla Enter for pressionada
      handleAddColumn();
    }
  };

  return (
    <DndProvider backend={HTML5Backend}>
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
              key={idx}
              column={column}
              editMode={editMode}
              tasks={tasks}
              onItemDrop={handleMoveTask}
              onRemove={handleRemoveColumn}
            />
          );
        })}
      </div>
    </DndProvider>
  );
}
