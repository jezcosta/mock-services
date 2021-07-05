import { Router } from "express";
import {
  CreateEnvironment,
  DeleteEnvironment,
  SelectEnvironment,
} from "../controllers/environment";

var router = Router();

router.post("/select-environment", function (req, res, next) {
  SelectEnvironment(req.body?.index || 0).then(() => {
    res.send("ok");
  });
});

router.post("/delete-environment", function (req, res, next) {
  DeleteEnvironment(req.body?.index || 0).then(() => {
    res.send("ok");
  });
});

router.post("/create-environment", function (req, res, next) {
  CreateEnvironment(req.body?.name, req.body?.address).then(() => {
    res.redirect("/mock-services/configs");
  });
});

export default router;
