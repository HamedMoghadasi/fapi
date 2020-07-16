import { Router } from "express";
import HeatMapServerController from "../controllers/HeatMapServerController";
import JwtHelper from "../utils/Jwt";

const router = Router();
const role = require("../constants/roles");

router.get("/", HeatMapServerController.getAll);

router.post("/", HeatMapServerController.add);
router.post("/findAllByKey", HeatMapServerController.findAllByKey);
router.post("/findAllByParams", HeatMapServerController.findAllByParams);

router.put("/:id", HeatMapServerController.update);

router.delete("/:id", HeatMapServerController.delete);

export default router;