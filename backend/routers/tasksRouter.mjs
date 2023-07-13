// projectRouter.mjs
import {
  getTasksOfKanbaColumn,
  getTasksOfProjects,
  deleteTask,
  createTask,
  updateTask,
} from "../services/tasksServices.mjs";

import { updateProjectTimers } from "../services/projectServices.mjs";

import Express from "express";
const router = Express.Router();

router.get("/project/:projectId", async (req, res) => {
  try {
    const tasks = await getTasksOfProjects(req.params.projectId);
    res.send({ success: true, tasks });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error });
  }
});

router.get("/column/:columnId", async (req, res) => {
  try {
    const tasks = await getTasksOfKanbaColumn(req.params.columnId);
    res.send({ success: true, tasks });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error });
  }
});

router.post("/:projectId", async (req, res) => {
  try {
    const task = await createTask(req.body, req.params.projectId);
    res.send({ success: true, task });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error });
  }
});

router.put("/:key", async (req, res) => {
  const { key, ...bodyWithoutKey } = req.body;
  try {
    const task = await updateTask(req.params.key, bodyWithoutKey);
    await updateProjectTimers(req.body.projectId);
    res.send({ success: true, task });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error });
  }
});

router.delete("/:key", async (req, res) => {
  try {
    await deleteTask(req.params.key);
    res.send({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error });
  }
});

export default router;
