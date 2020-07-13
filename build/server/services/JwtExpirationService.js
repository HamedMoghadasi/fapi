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

var JwtExpirationService = /*#__PURE__*/function () {
  function JwtExpirationService() {
    (0, _classCallCheck2["default"])(this, JwtExpirationService);
  }

  (0, _createClass2["default"])(JwtExpirationService, null, [{
    key: "getExpirationSettings",
    value: function () {
      var _getExpirationSettings = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var data;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                data = _models["default"].JWTExpirationSetting.findAll({
                  limit: 1,
                  order: [["createdAt", "DESC"]],
                  attributes: ["id", "default", "remembered"],
                  raw: true
                });
                console.log("data", data);
                _context.prev = 2;
                return _context.abrupt("return", _models["default"].JWTExpirationSetting.findAll({
                  limit: 1,
                  order: [["createdAt", "DESC"]],
                  raw: true
                }).then(function (response) {
                  if (!response.length) {
                    var result = {
                      "default": "0.5",
                      remembered: "7"
                    };
                    return result;
                  }

                  var jsonResponse = response[0];
                  console.log("b1", jsonResponse);
                  return {
                    "default": jsonResponse["default"],
                    remembered: jsonResponse.remembered
                  };
                }));

              case 6:
                _context.prev = 6;
                _context.t0 = _context["catch"](2);
                throw _context.t0;

              case 9:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[2, 6]]);
      }));

      function getExpirationSettings() {
        return _getExpirationSettings.apply(this, arguments);
      }

      return getExpirationSettings;
    }()
  }, {
    key: "add",
    value: function () {
      var _add = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(newSetting) {
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                return _context2.abrupt("return", _models["default"].JWTExpirationSetting.create(newSetting)["catch"](function (error) {
                  throw error;
                }));

              case 4:
                _context2.prev = 4;
                _context2.t0 = _context2["catch"](0);
                throw _context2.t0.detail;

              case 7:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 4]]);
      }));

      function add(_x) {
        return _add.apply(this, arguments);
      }

      return add;
    }()
  }]);
  return JwtExpirationService;
}();

var _default = JwtExpirationService;
exports["default"] = _default;