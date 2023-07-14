// projectsServices.mjs
import { Deta } from "deta";

const deta = Deta();
const db = deta.Base("Projects");

import { getTasksOfProjects } from "./tasksServices.mjs";
import { createErrorLog } from "./errorLogsServices.mjs";

export const fetchProjects = async () => {
  try {
    const projects = await db.fetch();
    projects.items.sort((a, b) => a.createdAt - b.createdAt);
    return projects.items;
  } catch (error) {
    await createErrorLog("fetchProjects", error);
    console.error(error);
    throw error;
  }
};

export const getProjectById = async (projectId) => {
  try {
    const project = db.get(projectId);
    return project;
  } catch (error) {
    await createErrorLog("getProjectById", error);
    console.error(error);
  }
};

export const createProject = async (projectData) => {
  try {
    const project = {
      name: projectData.name,
      description: projectData.description,
      estimatedTime: projectData.estimatedTime,
      elapsedTime: projectData.elapsedTime,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    const createdProject = await db.put(project);
    return createdProject;
  } catch (error) {
    await createErrorLog("createProject", error);
    console.error(error);
    throw error;
  }
};

export const updateProject = async (key, projectData) => {
  try {
    const { createdAt, ...updatedProject } = projectData; // Remover a propriedade "createdAt" do objeto "projectData"
    updatedProject.updatedAt = Date.now(); // Adicionar ou atualizar a propriedade "updatedAt"

    await db.update(updatedProject, key);
    return updatedProject;
  } catch (error) {
    await createErrorLog("updateProject", error);
    console.error(error);
    throw error;
  }
};

export const deleteProject = async (key) => {
  try {
    await db.delete(key);
  } catch (error) {
    await createErrorLog("updateTask", error);
    console.error(error);
    throw error;
  }
};

export const updateProjectTimers = async (key) => {
  try {
    //get project
    const project = await getProjectById(key);
    //get tasks
    const tasks = await getTasksOfProjects(key);
    // destructure projects to remove createdAt
    const { key: unusedKey, createdAt, ...updatedProject } = project; // Remover a propriedade "createdAt" do objeto "projectData"
    // update date
    updatedProject.updatedAt = Date.now(); // Adicionar ou atualizar a propriedade "updatedAt"
    // get total elapsedTimesIn tasks
    const totalElapsedTime = tasks.reduce((accumulator, task) => {
      return accumulator + task.timeSpend;
    }, 0);
    updatedProject.elapsedTime = totalElapsedTime;
    await db.update(updatedProject, key);
    return updatedProject;
  } catch (error) {
    await createErrorLog("updateProjectTimers", error);
    console.error(error);
    throw error;
  }
};
