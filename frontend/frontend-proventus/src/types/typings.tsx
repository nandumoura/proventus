export interface Task {
  id: string;
  name: string;
  projectId: string;
  timeSpend: number;
}

export interface DroppableAreaProps {
  changedItensDroped: (type: string, id: string) => void;
  type: string;
  tasks: Task[];
}

export interface DraggableItemProps {
  id: string;
  children: React.ReactNode;
}

export interface DragItem {
  id: string;
}

export interface TaskColumnProps {
  title: string;
  tasks: Task[];
  onRemove: (columnTitle: string) => void;
  onItemDrop: (titleColumnTarget: string, id: string) => void;
  setActiveTask: (id: string) => void;
}

export interface KanbanColumn {
  title: string;
  tasks: Task[];
}

export type KanbanState = {
  kanban: KanbanColumn[];
  activeItem: Task | null;
  setKanbanColumn: (column: Task[]) => void;
  setActiveItem: (task: Task) => void;
  removeObjectFromArray: (objectId: string) => void;
};

export interface KanbanStoreState {
  columns: KanbanColumn[];
  addColumn: (title: string) => void;
  removeColumn: (columnTitle: string) => void;
  addTask: (columnTitle: string, task: Task) => void;
  moveTask: (targetColumnTitle: string, taskId: string) => void;
}
