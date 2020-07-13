"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _JwtSettingController = _interopRequireDefault(require("../controllers/JwtSettingController"));

var _Jwt = _interopRequireDefault(require("../utils/Jwt"));

var role = require("../constants/roles");

var router = (0, _express.Router)();
router.get("/", _Jwt["default"].authurize([role.Admin]), _JwtSettingController["default"].Get);
router.get("/add", _Jwt["default"].authurize([role.Admin]), _JwtSettingController["default"].add);
var _default = router;
exports["default"] = _default;