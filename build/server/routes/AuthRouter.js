"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _UserController = _interopRequireDefault(require("../controllers/UserController"));

var _Jwt = _interopRequireDefault(require("../utils/Jwt"));

var role = require("../constants/roles");

var router = (0, _express.Router)();
router.post("/login", _UserController["default"].login);
router.post("/logout", _Jwt["default"].validateToken, _UserController["default"].logout);
router.post("/register", _UserController["default"].addUser);
router.post("/forgetPassword", _UserController["default"].forgetPassword);
router.get("/confirmation/:code", _UserController["default"].confirmUser);
router.post("/verifyUser", _UserController["default"].verifyUser);
router.post("/getAuthenticatedUser", _UserController["default"].getAuthenticatedUser);
var _default = router;
exports["default"] = _default;