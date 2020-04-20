import { Router } from "express";
import JwtSettingController from "../controllers/JwtSettingController";
import JwtHelper from "../utils/Jwt";

const role = require("../constants/roles");
const router = Router();

router.get("/", JwtHelper.authurize([role.Admin]), JwtSettingController.Get);
router.get("/add", JwtHelper.authurize([role.Admin]), JwtSettingController.add);

export default router;
