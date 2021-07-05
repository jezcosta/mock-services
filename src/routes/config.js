import { Router } from "express";
import { GetEnvironments } from "../controllers/environment";
import { GetMockFolders, GetMockSelected } from "../controllers/mock";
import { GetSelectedStatus } from "../controllers/status";
import { Status } from "../constants";

var router = Router();

router.get("/", function (req, res, next) {
  const folders = GetMockFolders();
  const environments = GetEnvironments();
  const mockSelected = GetMockSelected();
  const statusSelected = GetSelectedStatus();

  res.render("index", {
    folders,
    Status,
    environments,
    mockSelected,
    statusSelected,
    selectedFolder: req.query.folder,
  });
});

export default router;
