"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var jwt = _interopRequireWildcard(require("jsonwebtoken"));

var _config = _interopRequireDefault(require("../api/config/config"));

var _JwtExpirationService = _interopRequireDefault(require("../services/JwtExpirationService"));

var atob = require("atob");

var JwtHelper = /*#__PURE__*/function () {
  function JwtHelper() {
    (0, _classCallCheck2["default"])(this, JwtHelper);
  }

  (0, _createClass2["default"])(JwtHelper, null, [{
    key: "generateToken",
    value: function () {
      var _generateToken = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(payload) {
        var jwtExpiration, data;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _JwtExpirationService["default"].getExpirationSettings();

              case 2:
                jwtExpiration = _context.sent;
                data = {
                  id: payload.id,
                  username: payload.username,
                  email: payload.email,
                  role: payload.role,
                  iat: Math.floor(Date.now() / 1000),
                  exp: Math.floor(Date.now() / 1000) + 60 * 60 * jwtExpiration["default"] // hour

                };

                if (payload.rememberMe) {
                  console.log("remembered");
                  data.exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * jwtExpiration.remembered; //day
                }

                return _context.abrupt("return", jwt.sign(data, _config["default"].jwt.secret));

              case 6:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function generateToken(_x) {
        return _generateToken.apply(this, arguments);
      }

      return generateToken;
    }()
  }, {
    key: "authurize",
    value: function authurize(ExpectedRoles) {
      return function (req, res, next) {
        var authHeader = req.headers.authorization;
        var token = authHeader && authHeader.split(" ")[1];
        var base64Url = token.split(".")[1];
        var base64 = base64Url.replace("-", "+").replace("_", "/");
        var payload = JSON.parse(atob(base64));
        var isAuthurized = false;
        ExpectedRoles.forEach(function (item) {
          isAuthurized = isAuthurized || payload.role === item;
        });

        if (isAuthurized) {
          next();
        } else {
          return res.sendStatus(403);
        }
      };
    }
  }, {
    key: "validateToken",
    value: function validateToken(req, res, next) {
      var authHeader = req.headers.authorization;
      var token = authHeader && authHeader.split(" ")[1];
      if (token === null) return res.sendStatus(401);
      jwt.verify(token, _config["default"].jwt.secret, function (err, user) {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
      });
    }
  }, {
    key: "VerifyToken",
    value: function VerifyToken(accessToken) {
      var token = accessToken;
      if (token === null) return res.sendStatus(401);
      return jwt.verify(token, _config["default"].jwt.secret, function (err, user) {
        if (err) return {
          isValid: false,
          role: ""
        };
        return {
          isValid: true,
          role: user.role
        };
      });
    }
  }, {
    key: "GetCurrentUserByToken",
    value: function GetCurrentUserByToken(accessToken) {
      var token = accessToken;
      if (token === null) return res.sendStatus(401);
      return jwt.verify(token, _config["default"].jwt.secret, function (err, user) {
        console.log(user);
        if (err) return {};
        return {
          id: user.id,
          username: user.username,
          email: user.email,
          role: user.role,
          iat: user.iat,
          exp: user.exp
        };
      });
    }
  }]);
  return JwtHelper;
}();

exports["default"] = JwtHelper;