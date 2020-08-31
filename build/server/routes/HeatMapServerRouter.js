"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _HeatMapServerController = _interopRequireDefault(require("../controllers/HeatMapServerController"));

var _Jwt = _interopRequireDefault(require("../utils/Jwt"));

var router = (0, _express.Router)();

var role = require("../constants/roles");

router.get("/", _HeatMapServerController["default"].getAll);
router.post("/getUrl", _HeatMapServerController["default"].getUrl);
router.post("/getChangeUrl", _HeatMapServerController["default"].getChangeUrl);
router.post("/", _HeatMapServerController["default"].add);
router.post("/findAllByKey", _HeatMapServerController["default"].findAllByKey);
router.post("/findAllByParams", _HeatMapServerController["default"].findAllByParams);
router.post("/findAllByTimespan", _HeatMapServerController["default"].findAllByTimespan);
router.post("/findOneByParamsAndTimespanRange", _HeatMapServerController["default"].findOneByParamsAndTimespanRange);
router.post("/findChangeLayerByParamsAndTimespanRange", _HeatMapServerController["default"].findChangeLayerByParamsAndTimespanRange);
router.put("/:id", _HeatMapServerController["default"].update);
router["delete"]("/:id", _HeatMapServerController["default"]["delete"]);
var _default = router;
exports["default"] = _default;