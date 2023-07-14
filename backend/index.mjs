// index.mjs
import Express from "express";
import projectsRouter from "./routers/projectRouter.mjs";
import kanbanRouter from "./routers/kanbanRoutes.mjs";
import taskRouter from "./routers/tasksRouter.mjs";
import errorLogsRouter from "./routers/errorLogsRouter.mjs";

import cors from "cors";
const app = Express();

app.use(Express.json());
app.use(cors());
app.use("/projects", projectsRouter);
app.use("/kanban", kanbanRouter);
app.use("/tasks", taskRouter);
app.use("/error-logs", errorLogsRouter);
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`backend running on port ${port}!`);
});
