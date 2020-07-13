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

var _JwtExpirationService = _interopRequireDefault(require("../services/JwtExpirationService"));

var util = new _Utils["default"]();

var JwtSettingController = /*#__PURE__*/function () {
  function JwtSettingController() {
    (0, _classCallCheck2["default"])(this, JwtSettingController);
  }

  (0, _createClass2["default"])(JwtSettingController, null, [{
    key: "Get",
    value: function () {
      var _Get = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var response;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                response = _JwtExpirationService["default"].getExpirationSettings().then(function (response) {
                  util.setSuccess(200, "OK", response);
                  util.send(res);
                })["catch"](function (err) {
                  util.setError(500, "Server Error");
                  util.send(res);
                });

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function Get(_x, _x2) {
        return _Get.apply(this, arguments);
      }

      return Get;
    }()
  }, {
    key: "add",
    value: function () {
      var _add = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var newSettings, setting;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(!req.body["default"] || !req.body.remembered)) {
                  _context2.next = 3;
                  break;
                }

                util.setError(400, "Please provide complete details");
                return _context2.abrupt("return", util.send(res));

              case 3:
                newSettings = req.body;
                _context2.prev = 4;
                _context2.next = 7;
                return _JwtExpirationService["default"].add(newSettings);

              case 7:
                setting = _context2.sent;
                util.setSuccess(201, "Successfull! \n A confirmation email send for you.", setting);
                return _context2.abrupt("return", util.send(res));

              case 12:
                _context2.prev = 12;
                _context2.t0 = _context2["catch"](4);
                util.setError(400, _context2.t0.errors[0].message);
                return _context2.abrupt("return", util.send(res));

              case 16:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[4, 12]]);
      }));

      function add(_x3, _x4) {
        return _add.apply(this, arguments);
      }

      return add;
    }()
  }]);
  return JwtSettingController;
}();

var _default = JwtSettingController;
exports["default"] = _default;