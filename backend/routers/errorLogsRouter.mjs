import Express from "express";
const router = Express.Router();
import { createErrorLog } from "../services/errorLogsServices.mjs";

// send an object with name as namefrom error is and error message
router.post("/", async (req, res) => {
  try {
    await createErrorLog(req.body.name, req.body.error);
    res.send({ success: true });
  } catch (error) {
    console.error(error);
  }
});

export default router;
