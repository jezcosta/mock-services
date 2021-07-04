import { Router } from "express";
import { SelectStatus } from "../controllers/status";

var router = Router();

router.post("/select-status", function (req, res) {
  SelectStatus(req.body?.option).then(() => {
    res.send("ok");
  });
});

export default router;
