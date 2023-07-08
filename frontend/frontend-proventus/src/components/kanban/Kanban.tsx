import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

import { ChangeEvent, useEffect, useState } from "react";
import {  Task } from "../../types/typings";
import TaskColumn from "./ColumnTasks";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  addColumn,
  removeColumn,
  addTask,
  moveTask,
} from "../../features/projects/kanbamSlice";

export interface KanbanProps {
  tasks: Task[];
}

export default function Kanban({ tasks }: KanbanProps) {
  console.log("carregou kanban")
  const dispatch = useAppDispatch();
  const Kanban = useAppSelector((state) => state.kanban);

  const [newColumnTitle, setNewColumnTitle] = useState("");

  const handleAddColumn = () => {
    if (newColumnTitle.trim() !== "") {
      dispatch(addColumn(newColumnTitle));
      setNewColumnTitle("");
    }
  };

  const handleRemoveColumn = (columnTitle: string) => {
    dispatch(removeColumn(columnTitle));
  };

  const handleAddTask = (columnTitle: string) => {
    const task: Task = {
      id: Math.random().toString(36).substring(7),
      name: "New Task",
      projectId: "1",
      timeSpend: 0,
    };
    dispatch(addTask(columnTitle, task));
  };

  const handleMoveTask = (targetColumnTitle: string, taskId: string) => {
    dispatch(moveTask({targetColumnTitle, taskId}));
  };

  useEffect(() => {
    dispatch(addColumn("Tarefas"));
    tasks.map((task) => {
      dispatch(addTask({task}))
 
    });
  },[]);

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
        {Kanban.columns.map((column, idx) => {
          return (
            <TaskColumn
              key={idx}
              title={column.title}
              tasks={column.tasks}
              onItemDrop={handleMoveTask}
              setActiveTask={() => {}}
              onRemove={handleRemoveColumn}
            />
          );
        })}
      </div>
    </DndProvider>
  );
}
