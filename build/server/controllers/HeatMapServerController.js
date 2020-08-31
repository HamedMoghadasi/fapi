"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _Utils = _interopRequireDefault(require("../utils/Utils"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _HeatMapServerService = _interopRequireDefault(require("../services/HeatMapServerService"));

var _heatMapFetcherModule = require("../../server/modules/heatMapFetcher/heatMapFetcherModule");

_dotenv["default"].config();

var util = new _Utils["default"]();

var HeatMapServerController = /*#__PURE__*/function () {
  function HeatMapServerController() {
    (0, _classCallCheck2["default"])(this, HeatMapServerController);
  }

  (0, _createClass2["default"])(HeatMapServerController, null, [{
    key: "getAll",
    value: function () {
      var _getAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var heatMapServers;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _HeatMapServerService["default"].getAll();

              case 3:
                heatMapServers = _context.sent;

                if (heatMapServers.length > 0) {
                  util.setSuccess(200, "heatMapServers retrieved successfully", heatMapServers);
                } else {
                  util.setSuccess(200, "No heatMapServers found.");
                }

                return _context.abrupt("return", util.send(res));

              case 8:
                _context.prev = 8;
                _context.t0 = _context["catch"](0);
                console.error(_context.t0);
                util.setError(400, _context.t0);
                return _context.abrupt("return", util.send(res));

              case 13:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 8]]);
      }));

      function getAll(_x, _x2) {
        return _getAll.apply(this, arguments);
      }

      return getAll;
    }()
  }, {
    key: "findAllByTimespan",
    value: function () {
      var _findAllByTimespan = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var timespan, result;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                timespan = req.body.timespan;

                if (!timespan) {
                  _context2.next = 15;
                  break;
                }

                _context2.next = 5;
                return _HeatMapServerService["default"].findAllByTimespan(timespan);

              case 5:
                result = _context2.sent;

                if (!result.length) {
                  _context2.next = 11;
                  break;
                }

                util.setSuccess(200, "Successfully fetched.", result);
                return _context2.abrupt("return", util.send(res));

              case 11:
                util.setSuccess(200, "No HeatMapServers found.");
                return _context2.abrupt("return", util.send(res));

              case 13:
                _context2.next = 17;
                break;

              case 15:
                util.setError(400, "timespan is not valid");
                return _context2.abrupt("return", util.send(res));

              case 17:
                _context2.next = 23;
                break;

              case 19:
                _context2.prev = 19;
                _context2.t0 = _context2["catch"](0);
                util.setError(400, _context2.t0);
                return _context2.abrupt("return", util.send(res));

              case 23:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 19]]);
      }));

      function findAllByTimespan(_x3, _x4) {
        return _findAllByTimespan.apply(this, arguments);
      }

      return findAllByTimespan;
    }()
  }, {
    key: "findAllByKey",
    value: function () {
      var _findAllByKey = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var key, result;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                key = req.body.key;

                if (!key) {
                  _context3.next = 15;
                  break;
                }

                _context3.next = 5;
                return _HeatMapServerService["default"].findAllByKey(key);

              case 5:
                result = _context3.sent;

                if (!result.length) {
                  _context3.next = 11;
                  break;
                }

                util.setSuccess(200, "Successfully fetched.", result);
                return _context3.abrupt("return", util.send(res));

              case 11:
                util.setSuccess(200, "No HeatMapServers found.");
                return _context3.abrupt("return", util.send(res));

              case 13:
                _context3.next = 17;
                break;

              case 15:
                util.setError(400, "key is not valid");
                return _context3.abrupt("return", util.send(res));

              case 17:
                _context3.next = 23;
                break;

              case 19:
                _context3.prev = 19;
                _context3.t0 = _context3["catch"](0);
                util.setError(400, _context3.t0);
                return _context3.abrupt("return", util.send(res));

              case 23:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 19]]);
      }));

      function findAllByKey(_x5, _x6) {
        return _findAllByKey.apply(this, arguments);
      }

      return findAllByKey;
    }()
  }, {
    key: "findAllByParams",
    value: function () {
      var _findAllByParams = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var parameter, location, satelite, isValid, result;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                parameter = req.body.parameter;
                location = req.body.location;
                satelite = req.body.satelite;
                isValid = parameter && location && (satelite || satelite === "");

                if (!isValid) {
                  _context4.next = 18;
                  break;
                }

                _context4.next = 8;
                return _HeatMapServerService["default"].findAllByParams(parameter, location, satelite);

              case 8:
                result = _context4.sent;

                if (!result.length) {
                  _context4.next = 14;
                  break;
                }

                util.setSuccess(200, "Successfully fetched.", result);
                return _context4.abrupt("return", util.send(res));

              case 14:
                util.setSuccess(200, "No HeatMapServers found.");
                return _context4.abrupt("return", util.send(res));

              case 16:
                _context4.next = 20;
                break;

              case 18:
                util.setError(400, "params are not valid");
                return _context4.abrupt("return", util.send(res));

              case 20:
                _context4.next = 26;
                break;

              case 22:
                _context4.prev = 22;
                _context4.t0 = _context4["catch"](0);
                util.setError(400, _context4.t0);
                return _context4.abrupt("return", util.send(res));

              case 26:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 22]]);
      }));

      function findAllByParams(_x7, _x8) {
        return _findAllByParams.apply(this, arguments);
      }

      return findAllByParams;
    }()
  }, {
    key: "__findAllByParams",
    value: function () {
      var _findAllByParams2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(parameter, location, satellite) {
        var isValid, result;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                isValid = parameter && location && (satellite || satellite === "");

                if (!isValid) {
                  _context5.next = 13;
                  break;
                }

                _context5.next = 5;
                return _HeatMapServerService["default"].findAllByParams(parameter, location, satellite);

              case 5:
                result = _context5.sent;

                if (!result.length) {
                  _context5.next = 10;
                  break;
                }

                return _context5.abrupt("return", result);

              case 10:
                return _context5.abrupt("return", result);

              case 11:
                _context5.next = 14;
                break;

              case 13:
                return _context5.abrupt("return", -400);

              case 14:
                _context5.next = 19;
                break;

              case 16:
                _context5.prev = 16;
                _context5.t0 = _context5["catch"](0);
                return _context5.abrupt("return", -500);

              case 19:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 16]]);
      }));

      function __findAllByParams(_x9, _x10, _x11) {
        return _findAllByParams2.apply(this, arguments);
      }

      return __findAllByParams;
    }()
  }, {
    key: "__add",
    value: function () {
      var _add = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(heatmapServerObject) {
        var isSatelliteValid, result;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                isSatelliteValid = heatmapServerObject.satellite || heatmapServerObject.satellite === "";

                if (!(!heatmapServerObject.key || !heatmapServerObject.parameter || !heatmapServerObject.location || !isSatelliteValid || !heatmapServerObject.timespan)) {
                  _context6.next = 6;
                  break;
                }

                result - 400;
                _context6.next = 14;
                break;

              case 6:
                _context6.next = 8;
                return _HeatMapServerService["default"].add(heatmapServerObject);

              case 8:
                result = _context6.sent;

                if (!result) {
                  _context6.next = 13;
                  break;
                }

                return _context6.abrupt("return", result);

              case 13:
                return _context6.abrupt("return", -500);

              case 14:
                _context6.next = 19;
                break;

              case 16:
                _context6.prev = 16;
                _context6.t0 = _context6["catch"](0);
                return _context6.abrupt("return", -400);

              case 19:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[0, 16]]);
      }));

      function __add(_x12) {
        return _add.apply(this, arguments);
      }

      return __add;
    }()
  }, {
    key: "add",
    value: function () {
      var _add2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
        var newHeatMapServer, result;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                newHeatMapServer = req.body;

                if (!(!newHeatMapServer.key || !newHeatMapServer.parameter || !newHeatMapServer.location || !newHeatMapServer.satellite || newHeatMapServer.satellite !== "" || !newHeatMapServer.timespan)) {
                  _context7.next = 7;
                  break;
                }

                util.setError(400, "Please provide complete details.");
                return _context7.abrupt("return", util.send(res));

              case 7:
                _context7.next = 9;
                return _HeatMapServerService["default"].add(newHeatMapServer);

              case 9:
                result = _context7.sent;

                if (!result) {
                  _context7.next = 15;
                  break;
                }

                util.setSuccess(200, "Successfully Added.", result);
                return _context7.abrupt("return", util.send(res));

              case 15:
                util.setError(500, "An internal error occured!");
                return _context7.abrupt("return", util.send(res));

              case 17:
                _context7.next = 23;
                break;

              case 19:
                _context7.prev = 19;
                _context7.t0 = _context7["catch"](0);
                util.setError(400, _context7.t0);
                return _context7.abrupt("return", util.send(res));

              case 23:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[0, 19]]);
      }));

      function add(_x13, _x14) {
        return _add2.apply(this, arguments);
      }

      return add;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
        var newupdatedHeatMapServer, id, updatedLocationResult;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                newupdatedHeatMapServer = req.body;
                id = req.params.id;

                if (Number(id)) {
                  _context8.next = 5;
                  break;
                }

                util.setError(400, "Please input a valid numeric value");
                return _context8.abrupt("return", util.send(res));

              case 5:
                _context8.prev = 5;
                _context8.next = 8;
                return _HeatMapServerService["default"].update(id, newupdatedHeatMapServer);

              case 8:
                updatedLocationResult = _context8.sent;

                if (!updatedLocationResult) {
                  util.setError(400, "Cannot find heatMapServer with the id: ".concat(id));
                } else {
                  util.setSuccess(200, "heatMapServer updated", updatedLocationResult);
                }

                return _context8.abrupt("return", util.send(res));

              case 13:
                _context8.prev = 13;
                _context8.t0 = _context8["catch"](5);
                console.log(_context8.t0);
                util.setError(500, "An Internal error occured");
                return _context8.abrupt("return", util.send(res));

              case 18:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[5, 13]]);
      }));

      function update(_x15, _x16) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
        var id, deletedHeatMapServerResult;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                id = req.params.id;

                if (Number(id)) {
                  _context9.next = 4;
                  break;
                }

                util.setError(400, "Please input a valid numeric value");
                return _context9.abrupt("return", util.send(res));

              case 4:
                _context9.prev = 4;
                _context9.next = 7;
                return _HeatMapServerService["default"]["delete"](id);

              case 7:
                deletedHeatMapServerResult = _context9.sent;

                if (!deletedHeatMapServerResult) {
                  util.setError(400, "Cannot find heatMapServer with the id: ".concat(id));
                } else {
                  util.setSuccess(200, "HeatMapServer deleted");
                }

                return _context9.abrupt("return", util.send(res));

              case 12:
                _context9.prev = 12;
                _context9.t0 = _context9["catch"](4);
                console.log(_context9.t0);
                util.setError(500, "An Internal error occured");
                return _context9.abrupt("return", util.send(res));

              case 17:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, null, [[4, 12]]);
      }));

      function _delete(_x17, _x18) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }, {
    key: "getUrl",
    value: function () {
      var _getUrl = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
        var body, url;
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.prev = 0;
                body = req.body;

                if (!(!body.parameter || !body.location || !Object.keys(body.timespan).length)) {
                  _context10.next = 7;
                  break;
                }

                util.setError(400, "Please provide complete details.");
                return _context10.abrupt("return", util.send(res));

              case 7:
                console.log("body.timespan :>> ", body.timespan);
                _context10.next = 10;
                return (0, _heatMapFetcherModule.generateUrl)(body.timespan, {
                  parameter: body.parameter,
                  location: body.location,
                  satellite: body.satellite
                });

              case 10:
                url = _context10.sent;
                console.log("errrr :>> ");

                if (!url) {
                  _context10.next = 17;
                  break;
                }

                util.setSuccess(200, "Successfully! url generated.", {
                  url: url
                });
                return _context10.abrupt("return", util.send(res));

              case 17:
                util.setError(500, "An internal error occured!");
                return _context10.abrupt("return", util.send(res));

              case 19:
                _context10.next = 25;
                break;

              case 21:
                _context10.prev = 21;
                _context10.t0 = _context10["catch"](0);
                util.setError(400, _context10.t0);
                return _context10.abrupt("return", util.send(res));

              case 25:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, null, [[0, 21]]);
      }));

      function getUrl(_x19, _x20) {
        return _getUrl.apply(this, arguments);
      }

      return getUrl;
    }()
  }, {
    key: "getChangeUrl",
    value: function () {
      var _getChangeUrl = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res) {
        var body, url;
        return _regenerator["default"].wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.prev = 0;
                body = req.body;

                if (!(!body.parameter || !body.location || !Object.keys(body.timespan).length)) {
                  _context11.next = 7;
                  break;
                }

                util.setError(400, "Please provide complete details.");
                return _context11.abrupt("return", util.send(res));

              case 7:
                console.log("body.timespan :>> ", body.timespan);
                _context11.next = 10;
                return (0, _heatMapFetcherModule.generateChangeUrl)(body.timespan, {
                  parameter: body.parameter,
                  location: body.location,
                  satellite: body.satellite
                });

              case 10:
                url = _context11.sent;
                console.log("errrr :>> ");

                if (!url) {
                  _context11.next = 17;
                  break;
                }

                util.setSuccess(200, "Successfully! url generated.", {
                  url: url
                });
                return _context11.abrupt("return", util.send(res));

              case 17:
                util.setError(500, "An internal error occured!");
                return _context11.abrupt("return", util.send(res));

              case 19:
                _context11.next = 25;
                break;

              case 21:
                _context11.prev = 21;
                _context11.t0 = _context11["catch"](0);
                util.setError(400, _context11.t0);
                return _context11.abrupt("return", util.send(res));

              case 25:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, null, [[0, 21]]);
      }));

      function getChangeUrl(_x21, _x22) {
        return _getChangeUrl.apply(this, arguments);
      }

      return getChangeUrl;
    }()
  }, {
    key: "findOneByParamsAndTimespanRange",
    value: function () {
      var _findOneByParamsAndTimespanRange = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(req, res) {
        var parameter, location, satellite, timespan, isValid, result;
        return _regenerator["default"].wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.prev = 0;
                parameter = req.body.parameter;
                location = req.body.location;
                satellite = req.body.satellite;
                timespan = req.body.timespan;
                isValid = parameter && location && satellite && Object.keys(timespan).length;

                if (!isValid) {
                  _context12.next = 20;
                  break;
                }

                _context12.next = 9;
                return _HeatMapServerService["default"].findOneByParamsAndTimespanRange(parameter, location, satellite, timespan);

              case 9:
                result = _context12.sent;
                console.log("result :>> ", result);

                if (!result.length) {
                  _context12.next = 16;
                  break;
                }

                util.setSuccess(200, "Successfully fetched.", result);
                return _context12.abrupt("return", util.send(res));

              case 16:
                util.setSuccess(200, "No HeatMapServers found.");
                return _context12.abrupt("return", util.send(res));

              case 18:
                _context12.next = 22;
                break;

              case 20:
                util.setError(400, "params are not valid");
                return _context12.abrupt("return", util.send(res));

              case 22:
                _context12.next = 28;
                break;

              case 24:
                _context12.prev = 24;
                _context12.t0 = _context12["catch"](0);
                util.setError(400, _context12.t0);
                return _context12.abrupt("return", util.send(res));

              case 28:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, null, [[0, 24]]);
      }));

      function findOneByParamsAndTimespanRange(_x23, _x24) {
        return _findOneByParamsAndTimespanRange.apply(this, arguments);
      }

      return findOneByParamsAndTimespanRange;
    }()
  }, {
    key: "__findOneByParamsAndTimespanRange",
    value: function () {
      var _findOneByParamsAndTimespanRange2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(parameter, location, satellite, timespan) {
        var isValid, result;
        return _regenerator["default"].wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.prev = 0;
                isValid = parameter && location && satellite && Object.keys(timespan).length;

                if (!isValid) {
                  _context13.next = 13;
                  break;
                }

                _context13.next = 5;
                return _HeatMapServerService["default"].findOneByParamsAndTimespanRange(parameter, location, satellite, timespan);

              case 5:
                result = _context13.sent;

                if (!result.length) {
                  _context13.next = 10;
                  break;
                }

                return _context13.abrupt("return", result);

              case 10:
                return _context13.abrupt("return", result);

              case 11:
                _context13.next = 14;
                break;

              case 13:
                return _context13.abrupt("return", -400);

              case 14:
                _context13.next = 19;
                break;

              case 16:
                _context13.prev = 16;
                _context13.t0 = _context13["catch"](0);
                return _context13.abrupt("return", -500);

              case 19:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, null, [[0, 16]]);
      }));

      function __findOneByParamsAndTimespanRange(_x25, _x26, _x27, _x28) {
        return _findOneByParamsAndTimespanRange2.apply(this, arguments);
      }

      return __findOneByParamsAndTimespanRange;
    }()
  }, {
    key: "findChangeLayerByParamsAndTimespanRange",
    value: function () {
      var _findChangeLayerByParamsAndTimespanRange = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(req, res) {
        var parameter, location, satellite, timespan, isValid, result;
        return _regenerator["default"].wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.prev = 0;
                parameter = req.body.parameter;
                location = req.body.location;
                satellite = req.body.satellite;
                timespan = req.body.timespan;
                isValid = parameter && location && satellite && Object.keys(timespan).length;

                if (!isValid) {
                  _context14.next = 20;
                  break;
                }

                _context14.next = 9;
                return _HeatMapServerService["default"].findChangeLayerByParamsAndTimespanRange(parameter, location, satellite, timespan);

              case 9:
                result = _context14.sent;
                console.log("result :>> ", result);

                if (!result.length) {
                  _context14.next = 16;
                  break;
                }

                util.setSuccess(200, "Successfully fetched.", result);
                return _context14.abrupt("return", util.send(res));

              case 16:
                util.setSuccess(200, "No HeatMapServers found.");
                return _context14.abrupt("return", util.send(res));

              case 18:
                _context14.next = 22;
                break;

              case 20:
                util.setError(400, "params are not valid");
                return _context14.abrupt("return", util.send(res));

              case 22:
                _context14.next = 28;
                break;

              case 24:
                _context14.prev = 24;
                _context14.t0 = _context14["catch"](0);
                util.setError(400, _context14.t0);
                return _context14.abrupt("return", util.send(res));

              case 28:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, null, [[0, 24]]);
      }));

      function findChangeLayerByParamsAndTimespanRange(_x29, _x30) {
        return _findChangeLayerByParamsAndTimespanRange.apply(this, arguments);
      }

      return findChangeLayerByParamsAndTimespanRange;
    }()
  }, {
    key: "__findChangeLayerByParamsAndTimespanRange",
    value: function () {
      var _findChangeLayerByParamsAndTimespanRange2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(parameter, location, satellite, timespan) {
        var isValid, result;
        return _regenerator["default"].wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                _context15.prev = 0;
                isValid = parameter && location && satellite && Object.keys(timespan).length;

                if (!isValid) {
                  _context15.next = 14;
                  break;
                }

                _context15.next = 5;
                return _HeatMapServerService["default"].findChangeLayerByParamsAndTimespanRange(parameter, location, satellite, timespan);

              case 5:
                result = _context15.sent;
                console.log("result :>> ", result);

                if (!result.length) {
                  _context15.next = 11;
                  break;
                }

                return _context15.abrupt("return", result);

              case 11:
                return _context15.abrupt("return", result);

              case 12:
                _context15.next = 15;
                break;

              case 14:
                return _context15.abrupt("return", -400);

              case 15:
                _context15.next = 20;
                break;

              case 17:
                _context15.prev = 17;
                _context15.t0 = _context15["catch"](0);
                return _context15.abrupt("return", -500);

              case 20:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, null, [[0, 17]]);
      }));

      function __findChangeLayerByParamsAndTimespanRange(_x31, _x32, _x33, _x34) {
        return _findChangeLayerByParamsAndTimespanRange2.apply(this, arguments);
      }

      return __findChangeLayerByParamsAndTimespanRange;
    }()
  }]);
  return HeatMapServerController;
}();

var _default = HeatMapServerController;
exports["default"] = _default;