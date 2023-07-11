// projectRouter.mjs
import { fetchProjects, createProject, updateProject, deleteProject } from "../services/projectServices.mjs";
import {createKanban, deleteKanban} from "../services/kanbanServices.mjs"
import { v4 as uuidv4 } from 'uuid';
import Express from "express";
const router = Express.Router();

router.get("/", async (req, res) => {
  try {
    const projects = await fetchProjects();
    res.send({ success: true, projects });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error });
  }
});

router.post("/", async (req, res) => {
  try {
    const project = await createProject(req.body);
    const newKanban = {
      key: project.key,
      columns: [
        { 
          id: uuidv4(),
          title: "Todo",
          tasks: [],
        }
      ]
    }
    await createKanban(newKanban)
    res.send({ success: true, project });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error });
  }
});

router.put("/:key", async (req, res) => {
  try {
    const project = await updateProject(req.params.key, req.body);
    res.send({ success: true, project });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error });
  }
});

router.delete("/:key", async (req, res) => {
  try {
    await deleteProject(req.params.key);
    await deleteKanban(req.params.key)
    res.send({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error });
  }
});

export default router;
