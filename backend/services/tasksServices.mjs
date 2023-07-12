import { Deta } from "deta";
import {fetchKanban} from "./kanbanServices.mjs"
const deta = Deta();
const db = deta.Base("Tasks");


export const getTasksOfProjects = async (projectId) => {
  try {
    const tasks = await db.fetch({ projectId });
    return tasks.items;
  } catch (error) {
    console.error(error);
  }
};

export const getTasksOfKanbaColumn = async (columnId) => {
  try {
    const tasks = await db.fetch({ columnId });
    return tasks.items;
  } catch (error) {
    console.error(error);
  }
};

export const createTask = async (taskData, projectId) => {
  try {
    const kanban = await fetchKanban(projectId)
    const newTask = {
      ...taskData,
      columnId: kanban.columns[0].id,
      projectId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const taskCreated = await db.put(newTask);
    return taskCreated;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateTask = async (key, taskData) => {
  try {
    const newTask = {
      ...taskData,
      updatedAt: Date.now(),
    };
    const taskUpdated = await db.update(newTask, key);
    return taskUpdated;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteTask = async (key) => {
  try {
    await db.delete(key);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
