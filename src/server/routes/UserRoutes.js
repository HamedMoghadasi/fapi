import { Router } from "express";
import UserController from "../controllers/UserController";
import JwtHelper from "../utils/Jwt";

const router = Router();
const role = require("../constants/roles");

router.get("/", JwtHelper.authurize(role.Admin), UserController.getAllUsers);
router.get("/:id", JwtHelper.authurize(role.Admin), UserController.getAUser);
router.put("/:id", JwtHelper.authurize(role.Admin), UserController.updateUser);
router.delete(
  "/:id",
  JwtHelper.authurize(role.Admin),
  UserController.deleteUser
);

export default router;
