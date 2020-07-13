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

var _models = _interopRequireDefault(require("../api/models"));

var userActivity = require("../constants/userActivity");

var UserActivityLogService = /*#__PURE__*/function () {
  function UserActivityLogService() {
    (0, _classCallCheck2["default"])(this, UserActivityLogService);
  }

  (0, _createClass2["default"])(UserActivityLogService, null, [{
    key: "Log",
    value: function () {
      var _Log = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(action, userId) {
        var newLog;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                newLog = {
                  action: action,
                  userId: userId
                };
                return _context.abrupt("return", _models["default"].UserActivityLog.create(newLog)["catch"](function (error) {
                  console.error(error);
                  throw error;
                }));

              case 5:
                _context.prev = 5;
                _context.t0 = _context["catch"](0);
                console.log(_context.t0);
                throw _context.t0.detail;

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 5]]);
      }));

      function Log(_x, _x2) {
        return _Log.apply(this, arguments);
      }

      return Log;
    }()
  }, {
    key: "getLogsOfSpecificUserByActivity",
    value: function () {
      var _getLogsOfSpecificUserByActivity = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(id, activity) {
        var logs;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;

                if (!(activity === userActivity.Login)) {
                  _context2.next = 7;
                  break;
                }

                _context2.next = 4;
                return _models["default"].UserActivityLog.findAll({
                  where: {
                    action: userActivity.Login,
                    userId: id
                  }
                });

              case 4:
                logs = _context2.sent;
                _context2.next = 11;
                break;

              case 7:
                if (!(activity === userActivity.Logout)) {
                  _context2.next = 11;
                  break;
                }

                _context2.next = 10;
                return _models["default"].UserActivityLog.findAll({
                  where: {
                    action: userActivity.Logout,
                    userId: id
                  }
                });

              case 10:
                logs = _context2.sent;

              case 11:
                return _context2.abrupt("return", logs);

              case 14:
                _context2.prev = 14;
                _context2.t0 = _context2["catch"](0);
                throw _context2.t0;

              case 17:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 14]]);
      }));

      function getLogsOfSpecificUserByActivity(_x3, _x4) {
        return _getLogsOfSpecificUserByActivity.apply(this, arguments);
      }

      return getLogsOfSpecificUserByActivity;
    }()
  }, {
    key: "getLogsByUserId",
    value: function () {
      var _getLogsByUserId = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(id) {
        var logs;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _models["default"].UserActivityLog.findAll({
                  where: {
                    userId: id
                  }
                });

              case 3:
                logs = _context3.sent;
                return _context3.abrupt("return", logs);

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

      function getLogsByUserId(_x5) {
        return _getLogsByUserId.apply(this, arguments);
      }

      return getLogsByUserId;
    }()
  }, {
    key: "getAll",
    value: function () {
      var _getAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4() {
        var logs;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return _models["default"].UserActivityLog.findAll({});

              case 3:
                logs = _context4.sent;
                return _context4.abrupt("return", logs);

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

      function getAll() {
        return _getAll.apply(this, arguments);
      }

      return getAll;
    }()
  }, {
    key: "getLogsByActivity",
    value: function () {
      var _getLogsByActivity = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(activity) {
        var logs;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;

                if (!(activity === userActivity.Login)) {
                  _context5.next = 7;
                  break;
                }

                _context5.next = 4;
                return _models["default"].UserActivityLog.findAll({
                  where: {
                    action: userActivity.Login
                  }
                });

              case 4:
                logs = _context5.sent;
                _context5.next = 11;
                break;

              case 7:
                if (!(activity === userActivity.Logout)) {
                  _context5.next = 11;
                  break;
                }

                _context5.next = 10;
                return _models["default"].UserActivityLog.findAll({
                  where: {
                    action: userActivity.Logout
                  }
                });

              case 10:
                logs = _context5.sent;

              case 11:
                return _context5.abrupt("return", logs);

              case 14:
                _context5.prev = 14;
                _context5.t0 = _context5["catch"](0);
                throw _context5.t0;

              case 17:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 14]]);
      }));

      function getLogsByActivity(_x6) {
        return _getLogsByActivity.apply(this, arguments);
      }

      return getLogsByActivity;
    }()
  }]);
  return UserActivityLogService;
}();

var _default = UserActivityLogService;
exports["default"] = _default;