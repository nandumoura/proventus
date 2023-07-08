import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { KanbanColumn, Task } from "../../types/typings";

interface KanbanState {
  columns: KanbanColumn[];
}
interface AddTaskPayloadAction {
  columnTitle: string;
  task: Task;
}

const initialState: KanbanState = {
  columns: [],
};

const kanbanSlice = createSlice({
  name: "kanban",
  initialState,
  reducers: {
    addColumn: (state, action: PayloadAction<string>) => {
      const newColumn: KanbanColumn = {
        title: action.payload,
        tasks: [],
      };
      state.columns.push(newColumn);
    },
    removeColumn: (state, action: PayloadAction<string>) => {
      state.columns = state.columns.filter(
        (column) => column.title !== action.payload
      );
    },
    addTask: (
      state,
      action: PayloadAction<AddTaskPayloadAction>
    ) => {
      const { task } = action.payload;
      console.log(task);
      const column = state.columns.find(
        (column) => column.title === "Tarefas"
      );

      if (column) {
        column.tasks.push(task);
      }
    },
    moveTask: (
      state,
      action: PayloadAction<{ targetColumnTitle: string; taskId: string }>
    ) => {
      const { targetColumnTitle, taskId } = action.payload;
      const sourceColumnIndex = state.columns.findIndex((column) =>
        column.tasks.some((task) => task.id === taskId)
      );
      const targetColumnIndex = state.columns.findIndex(
        (column) => column.title === targetColumnTitle
      );

      if (sourceColumnIndex !== -1 && targetColumnIndex !== -1) {
        const sourceColumn = state.columns[sourceColumnIndex];
        const targetColumn = state.columns[targetColumnIndex];
        const sourceTasks = [...sourceColumn.tasks];
        const targetTasks = [...targetColumn.tasks];
        const taskIndex = sourceTasks.findIndex((task) => task.id === taskId);
        const task = sourceTasks[taskIndex];
        if (taskIndex !== -1) {
          sourceTasks.splice(taskIndex, 1);
          targetTasks.push(task);
        }
        state.columns[sourceColumnIndex].tasks = sourceTasks;
        state.columns[targetColumnIndex].tasks = targetTasks;
      }
    },
  },
});

export const { addColumn, removeColumn, addTask, moveTask } =
  kanbanSlice.actions;

export const selectColumns = (state: RootState) => state.kanban.columns;

export default kanbanSlice.reducer;
