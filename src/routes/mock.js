import { Router } from "express";
import l from "lodash";
import { CreateMockFolder, SelectMock } from "../controllers/mock";

var router = Router();

router.post("/create-folder", function (req, res) {
  const folderName = req.body?.folderName || Date.now();
  const folderNameFormatted = l.kebabCase(l.lowerCase(folderName));

  CreateMockFolder(folderNameFormatted).then(() => {
    SelectMock(folderNameFormatted).then(() => {
      res.redirect("/configs");
    });
  });
});

router.post("/select-mock", function (req, res) {
  SelectMock(req.body?.option || "").then(() => {
    res.send("ok");
  });
});

export default router;
