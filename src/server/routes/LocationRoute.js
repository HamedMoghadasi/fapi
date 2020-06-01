import { Router } from "express";
import LocationController from "../controllers/LocationController";
import JwtHelper from "../utils/Jwt";

const router = Router();
const role = require("../constants/roles");

router.get(
  "/",
  JwtHelper.authurize([role.Admin, role.User]),
  LocationController.getAll
);

router.get(
  "/find",
  JwtHelper.authurize([role.Admin, role.User]),
  LocationController.find
);

router.put(
  "/:id",
  JwtHelper.authurize([role.Admin]),
  LocationController.update
);

router.delete(
  "/:id",
  JwtHelper.authurize([role.Admin]),
  LocationController.delete
);

router.post("/", JwtHelper.authurize([role.Admin]), LocationController.add);

export default router;
