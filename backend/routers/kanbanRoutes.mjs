// projectRouter.mjs
import { updateKanban, fetchKanban } from "../services/kanbanServices.mjs";
import Express from "express";
const router = Express.Router();
import { createErrorLog } from "../services/errorLogsServices.mjs";

router.get("/:key", async (req, res) => {
  try {
    const kanban = await fetchKanban(req.params.key);
    res.send({ success: true, kanban: kanban });
  } catch (error) {
    await createErrorLog({
      name: "kanbanRoutes.get",
      error,
    });
    console.error(error);
    res.status(500).send({ success: false, error });
  }
});

router.put("/:key", async (req, res) => {
  const { key, ...bodyWithoutKey } = req.body;
  try {
    const kanban = await updateKanban(req.params.key, bodyWithoutKey);
    res.send({ success: true, kanban });
  } catch (error) {
    await createErrorLog({
      name: "kanbanRoutes.put",
      error,
    });
    console.error(error);
    res.status(500).send({ success: false, error });
  }
});

export default router;
