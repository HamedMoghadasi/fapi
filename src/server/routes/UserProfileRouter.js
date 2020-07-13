import { Router } from "express";
import UserController from "../controllers/UserController";
import JwtHelper from "../utils/Jwt";

const router = Router();
const role = require("../constants/roles");

router.get(
  "/",
  JwtHelper.authurize([role.Admin, role.User, role.Manager, role.SuperManager]),
  UserController.getUserAccount
);

router.put(
  "/",
  JwtHelper.authurize([role.Admin, role.User, role.Manager, role.SuperManager]),
  UserController.updateUserAccount
);

router.delete(
  "/",
  JwtHelper.authurize([role.Admin, role.User, role.Manager, role.SuperManager]),
  UserController.deleteUserAccount
);

router.post(
  "/ChangePassword",
  JwtHelper.authurize([role.Admin, role.User, role.Manager, role.SuperManager]),
  UserController.changePasswordFromProfile
);

export default router;
