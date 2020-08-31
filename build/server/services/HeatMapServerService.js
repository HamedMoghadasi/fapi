"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _models = _interopRequireDefault(require("../api/models"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _require = require("sequelize"),
    Op = _require.Op;

_dotenv["default"].config();

var url = process.env.HOST_URL;

var HeatMapServerService = /*#__PURE__*/function () {
  function HeatMapServerService() {
    (0, _classCallCheck2["default"])(this, HeatMapServerService);
  }

  (0, _createClass2["default"])(HeatMapServerService, null, [{
    key: "getAll",
    value: function () {
      var _getAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var heatMapServers;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _models["default"].HeatMapServer.findAll({});

              case 3:
                heatMapServers = _context.sent;
                return _context.abrupt("return", heatMapServers);

              case 7:
                _context.prev = 7;
                _context.t0 = _context["catch"](0);
                throw _context.t0;

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 7]]);
      }));

      function getAll() {
        return _getAll.apply(this, arguments);
      }

      return getAll;
    }()
  }, {
    key: "findAllByTimespan",
    value: function () {
      var _findAllByTimespan = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(timespan) {
        var heatMapServers;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _context2.next = 3;
                return _models["default"].HeatMapServer.findAll({
                  where: {
                    timespan: timespan
                  }
                });

              case 3:
                heatMapServers = _context2.sent;
                return _context2.abrupt("return", heatMapServers);

              case 7:
                _context2.prev = 7;
                _context2.t0 = _context2["catch"](0);
                throw _context2.t0;

              case 10:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 7]]);
      }));

      function findAllByTimespan(_x) {
        return _findAllByTimespan.apply(this, arguments);
      }

      return findAllByTimespan;
    }() //AOT_world_nasa

  }, {
    key: "findAllByKey",
    value: function () {
      var _findAllByKey = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(Key) {
        var heatMapServers;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _models["default"].HeatMapServer.findAll({
                  where: (0, _defineProperty2["default"])({}, Op.or, {
                    key: (0, _defineProperty2["default"])({}, Op.like, "%" + Key + "%")
                  })
                });

              case 3:
                heatMapServers = _context3.sent;
                return _context3.abrupt("return", heatMapServers);

              case 7:
                _context3.prev = 7;
                _context3.t0 = _context3["catch"](0);
                throw _context3.t0;

              case 10:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 7]]);
      }));

      function findAllByKey(_x2) {
        return _findAllByKey.apply(this, arguments);
      }

      return findAllByKey;
    }()
  }, {
    key: "findOneByParamsAndTimespanRange",
    value: function () {
      var _findOneByParamsAndTimespanRange = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(parameter, location, satellite, timespanRange) {
        var _timespan, heatMapServers;

        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return _models["default"].HeatMapServer.findAll({
                  where: (0, _defineProperty2["default"])({}, Op.and, (0, _defineProperty2["default"])({
                    parameter: parameter,
                    location: location,
                    satellite: satellite
                  }, Op.and, {
                    timespan: (_timespan = {}, (0, _defineProperty2["default"])(_timespan, Op.lte, timespanRange.end), (0, _defineProperty2["default"])(_timespan, Op.gte, timespanRange.start), _timespan)
                  })),
                  order: [["timespan", "ASC"]],
                  limit: 1
                });

              case 3:
                heatMapServers = _context4.sent;
                return _context4.abrupt("return", heatMapServers);

              case 7:
                _context4.prev = 7;
                _context4.t0 = _context4["catch"](0);
                throw _context4.t0;

              case 10:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 7]]);
      }));

      function findOneByParamsAndTimespanRange(_x3, _x4, _x5, _x6) {
        return _findOneByParamsAndTimespanRange.apply(this, arguments);
      }

      return findOneByParamsAndTimespanRange;
    }()
  }, {
    key: "findChangeLayerByParamsAndTimespanRange",
    value: function () {
      var _findChangeLayerByParamsAndTimespanRange = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(parameter, location, satellite, timespanRange) {
        var heatMapServers;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return _models["default"].HeatMapServer.findAll({
                  where: (0, _defineProperty2["default"])({}, Op.and, {
                    parameter: parameter,
                    location: location,
                    satellite: satellite,
                    timespan: (0, _defineProperty2["default"])({}, Op.lt, timespanRange.start)
                  }),
                  order: [["timespan", "DESC"]],
                  limit: 1
                });

              case 3:
                heatMapServers = _context5.sent;
                console.log("heatMapServers :>> ", heatMapServers);
                return _context5.abrupt("return", heatMapServers);

              case 8:
                _context5.prev = 8;
                _context5.t0 = _context5["catch"](0);
                throw _context5.t0;

              case 11:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 8]]);
      }));

      function findChangeLayerByParamsAndTimespanRange(_x7, _x8, _x9, _x10) {
        return _findChangeLayerByParamsAndTimespanRange.apply(this, arguments);
      }

      return findChangeLayerByParamsAndTimespanRange;
    }() //AOT , world , nasa

  }, {
    key: "findAllByParams",
    value: function () {
      var _findAllByParams = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(parameter, location, satellite) {
        var heatMapServers;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _context6.next = 3;
                return _models["default"].HeatMapServer.findAll({
                  where: (0, _defineProperty2["default"])({}, Op.and, {
                    parameter: parameter,
                    location: location,
                    satellite: satellite
                  })
                });

              case 3:
                heatMapServers = _context6.sent;
                return _context6.abrupt("return", heatMapServers);

              case 7:
                _context6.prev = 7;
                _context6.t0 = _context6["catch"](0);
                throw _context6.t0;

              case 10:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[0, 7]]);
      }));

      function findAllByParams(_x11, _x12, _x13) {
        return _findAllByParams.apply(this, arguments);
      }

      return findAllByParams;
    }()
  }, {
    key: "add",
    value: function () {
      var _add = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(newHeatMapServer) {
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                return _context7.abrupt("return", _models["default"].HeatMapServer.create(newHeatMapServer)["catch"](function (error) {
                  throw error;
                }));

              case 4:
                _context7.prev = 4;
                _context7.t0 = _context7["catch"](0);
                throw _context7.t0.detail;

              case 7:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[0, 4]]);
      }));

      function add(_x14) {
        return _add.apply(this, arguments);
      }

      return add;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(id, updatedHeatMapServer) {
        var heatMapServerToUpdate;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;
                _context8.next = 3;
                return _models["default"].HeatMapServer.findOne({
                  where: {
                    id: Number(id)
                  }
                });

              case 3:
                heatMapServerToUpdate = _context8.sent;

                if (!heatMapServerToUpdate) {
                  _context8.next = 8;
                  break;
                }

                _context8.next = 7;
                return _models["default"].HeatMapServer.update(updatedHeatMapServer, {
                  where: {
                    id: Number(id)
                  }
                });

              case 7:
                return _context8.abrupt("return", updatedHeatMapServer);

              case 8:
                return _context8.abrupt("return", null);

              case 11:
                _context8.prev = 11;
                _context8.t0 = _context8["catch"](0);
                throw _context8.t0;

              case 14:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[0, 11]]);
      }));

      function update(_x15, _x16) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(id) {
        var heatMapServerToDelete, deletedHeatMapServer;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;
                _context9.next = 3;
                return _models["default"].HeatMapServer.findOne({
                  where: {
                    id: Number(id)
                  }
                });

              case 3:
                heatMapServerToDelete = _context9.sent;

                if (!heatMapServerToDelete) {
                  _context9.next = 9;
                  break;
                }

                _context9.next = 7;
                return _models["default"].HeatMapServer.destroy({
                  where: {
                    id: Number(id)
                  }
                });

              case 7:
                deletedHeatMapServer = _context9.sent;
                return _context9.abrupt("return", deletedHeatMapServer);

              case 9:
                return _context9.abrupt("return", null);

              case 12:
                _context9.prev = 12;
                _context9.t0 = _context9["catch"](0);
                throw _context9.t0;

              case 15:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, null, [[0, 12]]);
      }));

      function _delete(_x17) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }]);
  return HeatMapServerService;
}();

exports["default"] = HeatMapServerService;