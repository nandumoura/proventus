// projectsServices.mjs
import { Deta } from "deta";

const deta = Deta();
const db = deta.Base("Projects");

export const fetchProjects = async () => {
  try {
    const projects = await db.fetch();
    projects.items.sort((a, b) => a.createdAt - b.createdAt);
    return projects.items;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getProjectById = async (projectId) =>{
  try {
    const project = db.get(projectId)
    return project
  } catch (error) {
    console.error(error)
  }
}

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
    console.error(error);
    throw error;
  }
};

export const updateProject = async (key, projectData) => {
  try {
    const updatedProject = {
      ...projectData,
      updatedAt: Date.now(),
    };
    await db.update(updatedProject, key);
    return updatedProject;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const deleteProject = async (key) => {
  try {
    await db.delete(key);
  } catch (error) {
    console.error(error);
    throw error;
  }
};
