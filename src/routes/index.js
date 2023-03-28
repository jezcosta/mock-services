import { Router } from "express";
import { GetMockOrService } from "../controllers/mock";

var router = Router();

const RouterHandler = (req, res, next) => {
  GetMockOrService(req)
    .then((response) => {
      setTimeout(() => {
        res.status(response.status);
        res.set(response.headers);
        res.send(response.data || {});
      }, response.delay || 200)
    })
    .catch((error) => {
      setTimeout(() => {
        res.status(error.status || 500);
        res.set(error.headers);
        res.send(error.data || {});
      }, response.delay || 200)
    });
};

router.get("/", RouterHandler);

router.get("/*", RouterHandler);

router.post("/*", RouterHandler);

router.patch("/*", RouterHandler);

router.put("/*", RouterHandler);

router.delete("/*", RouterHandler);

export default router;
