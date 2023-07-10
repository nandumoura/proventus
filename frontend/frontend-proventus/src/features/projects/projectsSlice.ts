import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProjectState } from "../../types/typings";

interface AddProjectPayload {
  project: ProjectState;
}

interface RemoveProjectPayload {
  projectKey: string;
}

interface UpdateElapsedTimePayload {
  projectKey: string;
  elapsedTime: number;
}

const projectSlice = createSlice({
  name: "project",
  initialState: [] as ProjectState[],
  reducers: {
    addProject(state, action: PayloadAction<AddProjectPayload>) {
      const { project } = action.payload;
      state.push(project);
    },
    removeProject(state, action: PayloadAction<RemoveProjectPayload>) {
      const { projectKey } = action.payload;
      return state.filter((project) => project.key !== projectKey);
    },
    updateElapsedTime(state, action: PayloadAction<UpdateElapsedTimePayload>) {
      const { projectKey, elapsedTime } = action.payload;
      const project = state.find((project) => project.key === projectKey);
      if (project) {
        project.elapsedTime = elapsedTime;
      }
    },
  },
});

export const { addProject, removeProject, updateElapsedTime } =
  projectSlice.actions;
export default projectSlice.reducer;
