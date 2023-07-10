import Express from "express";
import { fetchProjects, createProject, updateProject, deleteProject } from "./services/projectServices.mjs";

const app = Express();

app.use(Express.json());

app.get("/", async (req, res) => {
  try {
    const projects = await fetchProjects();
    res.send({ success: true, projects });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error });
  }
});

app.post("/", async (req, res) => {
  try {
    const project = await createProject(req.body);
    res.send({ success: true, project });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error });
  }
});

app.put("/:key", async (req, res) => {
  try {
    const project = await updateProject(req.params.key, req.body);
    res.send({ success: true, project });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error });
  }
});

app.delete("/:key", async (req, res) => {
  try {
    await deleteProject(req.params.key);
    res.send({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error });
  }
});

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`backend running on port ${port}!`);
});
