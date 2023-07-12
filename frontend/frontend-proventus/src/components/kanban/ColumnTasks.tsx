import { useState } from "react";
import { useDrag, useDrop, DragSourceMonitor } from "react-dnd";
import { DraggableItemProps, DragItem, Task } from "../../types/typings";
import TrashIcon from "../../icons/trash";

export interface TaskColumnProps {
  title: string;
  tasks: Task[];
  column: {
    id: string;
    title: string;
  }
  onRemove: (columnId: string) => void;
  onItemDrop: (titleColumnTarget: string, id: string) => void;
}

const TaskColumn: React.FC<TaskColumnProps> = ({
  column,
  tasks,
  onItemDrop,
  onRemove,
}) => {

  const [{ canDrop, isOver }, drop] = useDrop({
    accept: "draggableItem",
    drop: (item: DragItem) => onItemDrop(column.title, item.id),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  const isActive = canDrop && isOver;

  return (
    <div
      ref={drop}
      className={`p-2 w-1/3 min-h-fit ${
        isActive ? "border-dashed border-2 border-slate-700" : ""
      }`}
    >
      <div className="flex justify-between">
        <h3>{column.title}</h3>
        <button
        className="text-red-500 hover:text-red-300 p-2 my-2 hover:bg-slate-500 bg-slate-100 shadow-md rounded"
          onClick={() => {
            onRemove(column.id);
          }}
        >
          <TrashIcon />
        </button>
      </div>

      <div className={`min-w-full bg-slate-100 p-4 rounded-md `}>
        {tasks.map((task) => (
          <DraggableItem key={task.key} id={task.key}>
            <TaskCard name={task.title} />
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

const TaskCard = ({ name }: { name: string }) => {
  return (
    <div className="bg-slate-50 rounded-md shadow my-1 p-2 flex justify-between">
      <p className="p-2 ">{name} </p>
      <PlayBtn popoverText="Começar a contabilizar tempo" />
    </div>
  );
};

const PlayBtn = ({ popoverText }: { popoverText?: string }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button className="hover:bg-slate-200 p-1 rounded-md border-slate-500 border-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
          />
        </svg>
      </button>
      {isHovered && (
        <div className="absolute left-0 bottom-full p-4 bg-slate-50 shadow">
          <p>{popoverText}</p>
        </div>
      )}
    </div>
  );
};

export default TaskColumn;
