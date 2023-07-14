import React, { useEffect } from "react";
import { useDrag, useDrop, DragSourceMonitor } from "react-dnd";
import { DraggableItemProps, DragItem } from "../../types/typings";
import TrashIcon from "../../icons/trash";
import { useGetTasksByColumnIdQuery } from "../../services/tasksApi";
import TaskCard from "../TaskCard/TaskCard";
import { sendErrorLogs } from "../../services/errorLogsApi";

export interface TaskColumnProps {
  editMode: boolean;
  column: {
    id: string;
    title: string;
  };
  onRemove: (columnId: string) => void;
  onItemDrop: (titleColumnTarget: string, task: string) => void;
  reloadTaskColumn: () => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({
  column,
  editMode,
  onItemDrop,
  onRemove,
  reloadTaskColumn,
}) => {
  console.log("Taskcolumn loaded");
  const {
    data: tasks,
    error: tasksError,
    isLoading: tasksIsLoading,
    refetch,
  } = useGetTasksByColumnIdQuery(column.id);

  useEffect(() => {
    refetch();
  }, [reloadTaskColumn, refetch]);

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "draggableItem",
    drop: (item: DragItem) => onItemDrop(column.id, item.id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  if (tasksIsLoading || tasks === undefined || column === undefined) {
    return <>Loading ...</>;
  }

  if (tasksError) {
    sendErrorLogs("tasksError", tasksError);
    return <>An error has occurred</>;
  }
  const isActive = canDrop && isOver;

  return (
    <div
      ref={drop}
      className={`p-2 w-full md:w-1/2  lg:w-1/3 min-h-fit ${
        isActive ? "border-dashed border-2 border-slate-700" : ""
      }`}
    >
      <div className="flex justify-between">
        <h3>{column.title}</h3>
        {editMode && (
          <button
            className="text-red-500 hover:text-slate-50 p-2 my-2 hover:bg-red-300 bg-slate-100 shadow-md rounded"
            onClick={() => {
              onRemove(column.id);
            }}
          >
            <TrashIcon />
          </button>
        )}
      </div>

      <div className={`min-w-full bg-slate-100 p-4 rounded-md `}>
        {tasks.map((task) => (
          <DraggableItem key={task.key} id={task.key || ""}>
            <TaskCard
              task={task}
              editMode={editMode}
              onReload={reloadTaskColumn}
            />
          </DraggableItem>
        ))}
      </div>
    </div>
  );
};

const DraggableItem: React.FC<DraggableItemProps> = ({ id, children }) => {
  const [{ isDragging }, drag] = useDrag<
    DragItem,
    unknown,
    { isDragging: boolean }
  >({
    type: "draggableItem",
    item: { id },
    collect: (monitor: DragSourceMonitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={drag}
      style={{ opacity: isDragging ? 0.5 : 1 }}
      className="draggable-item"
    >
      {children}
    </div>
  );
};

export default TaskColumn;
