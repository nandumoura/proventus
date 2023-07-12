import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { ChangeEvent, useEffect, useState } from "react";
import { Task } from "../../types/typings";
import TaskColumn from "./ColumnTasks";
import {
  useGetKanbanQuery,
  useAddColumnMutation,
} from "../../services/kanbanApi";
import { useGetTasksByProjectIdQuery } from "../../services/tasksApi";

export interface KanbanProps {
  tasks: Task[];
}

export default function Kanban() {
  const { projectId } = useParams();
  const [addColumn] = useAddColumnMutation();
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
  } = useGetTasksByProjectIdQuery(projectId);
  const [newColumnTitle, setNewColumnTitle] = useState("");

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

  const handleAddColumn = async () => {
    if (newColumnTitle.trim() !== "") {
      const { key, ...kanbanWithoutKey } = kanban; // Remover a propriedade "key" do objeto "kanban"
  
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
  
      await addColumn({ kanban: newKanbanState, projectKey: projectId });
      await kanbanRefetch();
      setNewColumnTitle("");
    }
  };

  const handleRemoveColumn = (columnTitle: string) => {
    // dispatch(removeColumn(columnTitle));
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

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="header flex justify-between bg-slate-100 p-2">
        <h2 className="font-bold text-2xl text-gray-800">Kanban</h2>
        <input
          value={newColumnTitle}
          onChange={handleInputChange}
          type="text"
        />
        <button onClick={handleAddColumn}>Add column</button>
      </div>
      <div className="flex justify-between bg-slate-200 p-2">
        {kanban.columns.map((column, idx) => {
          return (
            <TaskColumn
              key={idx}
              title={column.title}
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
