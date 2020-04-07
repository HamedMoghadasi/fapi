import { Router } from "express";
import UserController from "../controllers/UserController";
import JwtHelper from "../utils/Jwt";

const router = Router();
const role = require("../constants/roles");

router.get("/", JwtHelper.authurize(role.User), UserController.getUserAccount);
router.put(
  "/",
  JwtHelper.authurize(role.User),
  UserController.updateUserAccount
);
router.delete(
  "/",
  JwtHelper.authurize(role.User),
  UserController.deleteUserAccount
);

export default router;
