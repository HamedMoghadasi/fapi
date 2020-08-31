"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _BaseMapServerController = _interopRequireDefault(require("../controllers/BaseMapServerController"));

var _Jwt = _interopRequireDefault(require("../utils/Jwt"));

var _multer = _interopRequireDefault(require("multer"));

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

var __basedir = process.env.PWD;
var uploadDest = __basedir + "/src/server/assets/images/baselayers";

var storage = _multer["default"].diskStorage({
  destination: function destination(req, file, cb) {
    cb(null, uploadDest);
  },
  filename: function filename(req, file, cb) {
    var uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    var extension = file.originalname.split(".").pop();
    cb(null, "".concat(file.fieldname, "-").concat(uniqueSuffix, ".").concat(extension));
  }
});

var upload = (0, _multer["default"])({
  storage: storage
});
var router = (0, _express.Router)();

var role = require("../constants/roles");

router.get("/", _Jwt["default"].authurize([role.Admin, role.User, role.Manager, role.SuperManager]), _BaseMapServerController["default"].getAll);
router.post("/find", _BaseMapServerController["default"].find);
router.put("/:id", upload.single("baseMapImage"), _Jwt["default"].authurize([role.Admin]), _BaseMapServerController["default"].update);
router["delete"]("/:id", _Jwt["default"].authurize([role.Admin]), _BaseMapServerController["default"]["delete"]);
router.post("/", upload.single("baseMapImage"), _Jwt["default"].authurize([role.Admin]), _BaseMapServerController["default"].add);
var _default = router;
exports["default"] = _default;