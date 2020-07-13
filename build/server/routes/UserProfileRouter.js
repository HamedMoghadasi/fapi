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

router.get("/", _Jwt["default"].authurize([role.Admin, role.User]), _UserController["default"].getUserAccount);
router.put("/", _Jwt["default"].authurize([role.Admin, role.User]), _UserController["default"].updateUserAccount);
router["delete"]("/", _Jwt["default"].authurize([role.Admin, role.User]), _UserController["default"].deleteUserAccount);
router.post("/ChangePassword", _Jwt["default"].authurize([role.Admin, role.User]), _UserController["default"].changePasswordFromProfile);
var _default = router;
exports["default"] = _default;