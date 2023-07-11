// index.mjs
import Express from "express";
import projectsRouter from "./routers/projectRouter.mjs"
import kanbanRouter from "./routers/kanbanRoutes.mjs"
import cors from "cors"
const app = Express();

app.use(Express.json());
app.use(cors())
app.use("/projects",projectsRouter)
app.use("/kanban",kanbanRouter)

const port = process.env.PORT;
console.log(process.env)
app.listen(port, () => {
  console.log(`backend running on port ${port}!`);
});
