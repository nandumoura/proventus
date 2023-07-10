// index.mjs
import Express from "express";
import projects from "./routers/projectRouter.mjs"

const app = Express();

app.use(Express.json());
app.use("/projects",projects)

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`backend running on port ${port}!`);
});
