"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _UserController = _interopRequireDefault(require("../controllers/UserController"));

var _Jwt = _interopRequireDefault(require("../utils/Jwt"));

var router = (0, _express.Router)();

var role = require("../constants/roles");

router.put("/changestate/:id", _Jwt["default"].authurize([role.Admin]), _UserController["default"].changeState);
router.get("/getByState/:targetState", _Jwt["default"].authurize([role.Admin]), _UserController["default"].getUsersByState);
router.get("/", _Jwt["default"].authurize([role.Admin]), _UserController["default"].getAllUsers);
router.get("/:id", _Jwt["default"].authurize([role.Admin]), _UserController["default"].getAUser);
router.put("/:id", _Jwt["default"].authurize([role.Admin]), _UserController["default"].updateUser);
router["delete"]("/:id", _Jwt["default"].authurize([role.Admin]), _UserController["default"].deleteUser);
router.post("/resetPaswordByAdmin", _Jwt["default"].authurize([role.Admin]), _UserController["default"].resetAUserPasswordByAdmin);
var _default = router;
exports["default"] = _default;