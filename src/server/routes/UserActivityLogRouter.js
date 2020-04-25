import { Router } from "express";
import UserActivityLogController from "../controllers/UserActivityLogController";
import JwtHelper from "../utils/Jwt";

const router = Router();
const role = require("../constants/roles");

router.get(
  "/ByActivity/:activity/:id",
  JwtHelper.authurize([role.Admin]),
  UserActivityLogController.getLogsOfSpecificUserByActivity
);

router.get(
  "/ByActivity/:activity",
  JwtHelper.authurize([role.Admin]),
  UserActivityLogController.getLogsByActivity
);

router.get(
  "/",
  JwtHelper.authurize([role.Admin]),
  UserActivityLogController.getAll
);

router.get(
  "/ByUserId/:id",
  JwtHelper.authurize([role.Admin]),
  UserActivityLogController.getLogsByUserId
);

export default router;
