"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _UserActivityLogController = _interopRequireDefault(require("../controllers/UserActivityLogController"));

var _Jwt = _interopRequireDefault(require("../utils/Jwt"));

var router = (0, _express.Router)();

var role = require("../constants/roles");

router.get("/ByActivity/:activity/:id", _Jwt["default"].authurize([role.Admin]), _UserActivityLogController["default"].getLogsOfSpecificUserByActivity);
router.get("/ByActivity/:activity", _Jwt["default"].authurize([role.Admin]), _UserActivityLogController["default"].getLogsByActivity);
router.get("/", _Jwt["default"].authurize([role.Admin]), _UserActivityLogController["default"].getAll);
router.get("/ByUserId/:id", _Jwt["default"].authurize([role.Admin]), _UserActivityLogController["default"].getLogsByUserId);
var _default = router;
exports["default"] = _default;