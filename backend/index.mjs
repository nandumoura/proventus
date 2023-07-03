import { Deta } from "deta";
import Express from "express";

const app = Express();

const deta = Deta();
const db = deta.Base("todos");

app.use(Express.json());

app.get("/", async (req, res) => {
  try {
    const todos = await db.fetch();
    todos.items.sort((a, b) => a.createdAt - b.createdAt);

    res.send({ success: true, todos: todos.items });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error });
  }
});

app.post("/", async (req, res) => {
  try {
    const todo = await db.put({
      text: req.body.text,
      createdAt: Date.now(),
      done: false,
    });

    res.send({ success: true, todo });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error });
  }
});

app.put("/:key", async (req, res) => {
  try {
    const todo = await db.get(req.params.key);

    await db.update({ done: !todo.done }, req.params.key);

    res.send({ success: true, todo });
  } catch (error) {
    console.error(error);
    res.status(500).send({ success: false, error });
  }
});

app.delete("/:key", async (req, res) => {
  try {
    await db.delete(req.params.key);
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
