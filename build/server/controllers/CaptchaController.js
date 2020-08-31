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

var _svgCaptcha = _interopRequireDefault(require("svg-captcha"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

var _Utils = _interopRequireDefault(require("../utils/Utils"));

var util = new _Utils["default"]();

var CaptchaController = /*#__PURE__*/function () {
  function CaptchaController() {
    (0, _classCallCheck2["default"])(this, CaptchaController);
  }

  (0, _createClass2["default"])(CaptchaController, null, [{
    key: "Get",
    value: function () {
      var _Get = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var captcha;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                captcha = _svgCaptcha["default"].create({
                  ignoreChars: "0o1ilQWERTYUIOPASDFGHJKLZXCVBNM",
                  noise: 5
                });
                _context.next = 4;
                return _bcryptjs["default"].hash(captcha.text, 5).then(function (hash) {
                  captcha.text = hash;
                  util.setSuccess(200, "Succefull!", {
                    captcha: {
                      token: captcha.text,
                      svg: captcha.data
                    }
                  });
                  return util.send(res);
                })["catch"](function (err) {
                  util.setError(400, "An error occured on CAPTCHA service.", {
                    code: 5001
                  });
                  return util.send(res);
                });

              case 4:
                _context.next = 10;
                break;

              case 6:
                _context.prev = 6;
                _context.t0 = _context["catch"](0);
                util.setError(400, "An error occured on CAPTCHA service.", {
                  code: 5002
                });
                return _context.abrupt("return", util.send(res));

              case 10:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 6]]);
      }));

      function Get(_x, _x2) {
        return _Get.apply(this, arguments);
      }

      return Get;
    }()
  }]);
  return CaptchaController;
}();

var _default = CaptchaController;
exports["default"] = _default;