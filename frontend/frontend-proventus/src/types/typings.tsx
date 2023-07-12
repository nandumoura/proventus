export interface Task {
  key: string;
  title: string;
  description: string;
  projectId: string;
  columnId: string;
  timeSpend: number;
}
export interface ProjectState {
  key?: string;
  createdAt?: number;
  updatedAt?: number;
  name: string;
  description: string;
  estimatedTime: number;
  elapsedTime: number;
}
export interface Timer {
  seconds: number;
  minutes: number;
  hours: number;
  days: number;
  months: number;
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
