import { Router } from "express";
import JwtSettingController from "../controllers/JwtSettingController";
import JwtHelper from "../utils/Jwt";

const role = require("../constants/roles");
const router = Router();

router.get("/", JwtSettingController.Get);

export default router;
