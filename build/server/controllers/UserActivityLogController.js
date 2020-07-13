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

var _UserService = _interopRequireDefault(require("../services/UserService"));

var _Utils = _interopRequireDefault(require("../utils/Utils"));

var _Jwt = _interopRequireDefault(require("../utils/Jwt"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _MailService = _interopRequireDefault(require("../services/MailService"));

var _v = _interopRequireDefault(require("uuid/v4"));

var _UserActivityLogService = _interopRequireDefault(require("../services/UserActivityLogService"));

var util = new _Utils["default"]();

var state = require("../constants/userStates");

var userActivity = require("../constants/userActivity");

var UserActivityLogController = /*#__PURE__*/function () {
  function UserActivityLogController() {
    (0, _classCallCheck2["default"])(this, UserActivityLogController);
  }

  (0, _createClass2["default"])(UserActivityLogController, null, [{
    key: "getLogsByUserId",
    value: function () {
      var _getLogsByUserId = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var id, logs;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                id = req.params.id;
                _context.next = 4;
                return _UserActivityLogService["default"].getLogsByUserId(id);

              case 4:
                logs = _context.sent;

                if (logs.length > 0) {
                  util.setSuccess(200, "user activity logs retrieved successfully", logs);
                } else {
                  util.setSuccess(200, "No log found for current user");
                }

                return _context.abrupt("return", util.send(res));

              case 9:
                _context.prev = 9;
                _context.t0 = _context["catch"](0);
                console.error(_context.t0);
                util.setError(400, _context.t0);
                return _context.abrupt("return", util.send(res));

              case 14:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 9]]);
      }));

      function getLogsByUserId(_x, _x2) {
        return _getLogsByUserId.apply(this, arguments);
      }

      return getLogsByUserId;
    }()
  }, {
    key: "getLogsOfSpecificUserByActivity",
    value: function () {
      var _getLogsOfSpecificUserByActivity = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var _req$params, activity, id, logs;

        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                _req$params = req.params, activity = _req$params.activity, id = _req$params.id;
                _context2.next = 4;
                return _UserActivityLogService["default"].getLogsOfSpecificUserByActivity(id, activity);

              case 4:
                logs = _context2.sent;

                if (logs.length > 0) {
                  util.setSuccess(200, "user ".concat(activity, " logs retrieved successfully"), logs);
                } else {
                  util.setSuccess(200, "No logs found for '".concat(activity, "' activity"));
                }

                return _context2.abrupt("return", util.send(res));

              case 9:
                _context2.prev = 9;
                _context2.t0 = _context2["catch"](0);
                console.error(_context2.t0);
                util.setError(400, _context2.t0);
                return _context2.abrupt("return", util.send(res));

              case 14:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 9]]);
      }));

      function getLogsOfSpecificUserByActivity(_x3, _x4) {
        return _getLogsOfSpecificUserByActivity.apply(this, arguments);
      }

      return getLogsOfSpecificUserByActivity;
    }()
  }, {
    key: "getLogsByActivity",
    value: function () {
      var _getLogsByActivity = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var activity, logs;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                activity = req.params.activity;
                _context3.next = 4;
                return _UserActivityLogService["default"].getLogsByActivity(activity);

              case 4:
                logs = _context3.sent;

                if (logs.length > 0) {
                  util.setSuccess(200, "user ".concat(activity, " logs retrieved successfully"), logs);
                } else {
                  util.setSuccess(200, "No logs found for '".concat(activity, "' activity"));
                }

                return _context3.abrupt("return", util.send(res));

              case 9:
                _context3.prev = 9;
                _context3.t0 = _context3["catch"](0);
                console.error(_context3.t0);
                util.setError(400, _context3.t0);
                return _context3.abrupt("return", util.send(res));

              case 14:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 9]]);
      }));

      function getLogsByActivity(_x5, _x6) {
        return _getLogsByActivity.apply(this, arguments);
      }

      return getLogsByActivity;
    }()
  }, {
    key: "getAll",
    value: function () {
      var _getAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var logs;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return _UserActivityLogService["default"].getAll();

              case 3:
                logs = _context4.sent;

                if (logs.length > 0) {
                  util.setSuccess(200, "users logs retrieved successfully", logs);
                } else {
                  util.setSuccess(200, "No logs found.");
                }

                return _context4.abrupt("return", util.send(res));

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4["catch"](0);
                console.error(_context4.t0);
                util.setError(400, _context4.t0);
                return _context4.abrupt("return", util.send(res));

              case 13:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 8]]);
      }));

      function getAll(_x7, _x8) {
        return _getAll.apply(this, arguments);
      }

      return getAll;
    }()
  }]);
  return UserActivityLogController;
}();

var _default = UserActivityLogController;
exports["default"] = _default;