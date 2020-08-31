"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _LocationController = _interopRequireDefault(require("../controllers/LocationController"));

var _Jwt = _interopRequireDefault(require("../utils/Jwt"));

var router = (0, _express.Router)();

var role = require("../constants/roles");

router.get("/", _Jwt["default"].authurize([role.Admin, role.User, role.Manager, role.SuperManager]), _LocationController["default"].getAll);
router.post("/find", _LocationController["default"].find);
router.put("/:id", _Jwt["default"].authurize([role.Admin]), _LocationController["default"].update);
router["delete"]("/:id", _Jwt["default"].authurize([role.Admin]), _LocationController["default"]["delete"]);
router.post("/", _Jwt["default"].authurize([role.Admin]), _LocationController["default"].add);
var _default = router;
exports["default"] = _default;