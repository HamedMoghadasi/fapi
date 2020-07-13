import { Router } from "express";
import CustomLayerFileController from "../controllers/CustomLayerFileController";
import JwtHelper from "../utils/Jwt";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();
const __basedir = process.env.PWD;
const uploadDest = __basedir + "/src/server/assets/customVectorFiles";

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDest);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extension = file.originalname.split(".").pop();
    cb(null, `${file.fieldname}-${uniqueSuffix}.${extension}`);
  },
});

var upload = multer({ storage: storage });

const router = Router();
const role = require("../constants/roles");

router.get(
  "/",
  JwtHelper.authurize([role.Admin, role.User, role.Manager, role.SuperManager]),
  CustomLayerFileController.getAll
);

router.post("/find", CustomLayerFileController.find);

router.put(
  "/:id",
  upload.single("customVectorFile"),
  JwtHelper.authurize([role.Admin]),
  CustomLayerFileController.update
);

router.delete(
  "/:id",
  JwtHelper.authurize([role.Admin]),
  CustomLayerFileController.delete
);

router.post(
  "/",
  upload.single("customVectorFile"),
  JwtHelper.authurize([role.Admin]),
  CustomLayerFileController.add
);

export default router;
