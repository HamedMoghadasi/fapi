"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = exports.generateChangeUrl = exports.generateUrl = exports.getChangeLayerTimeNode = exports.getTimeNode = exports.getTimeDirectories = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _fs = _interopRequireDefault(require("fs"));

var _lodash = _interopRequireDefault(require("lodash"));

var _HeatMapServerController = _interopRequireDefault(require("../../controllers/HeatMapServerController"));

var _addresses = require("./addresses");

var getTimeDirectories = function getTimeDirectories(basePath, params) {
  var path = basePath;
  params.map(function (param) {
    path = "".concat(path, "/").concat(param);
  });

  var directories = _fs["default"].readdirSync(path).filter(function (file) {
    return _fs["default"].statSync(path + "/" + file).isDirectory();
  }).filter(function (directory) {
    return Number(directory[0]);
  });

  var key = "";
  params.map(function (param) {
    key = key.length > 0 ? "".concat(key, "_").concat(param) : "".concat(param);
  });
  var result = directories.map(function (directory) {
    return {
      key: "".concat(key, "_").concat(directory),
      parameter: params[0] ? params[0] : "",
      location: params[1] ? params[1] : "",
      satellite: params[2] ? params[2] : "",
      timespan: directory
    };
  });
  result.map(function (item) {
    _HeatMapServerController["default"].__add(item);
  });
  return result;
};

exports.getTimeDirectories = getTimeDirectories;

var getTimeNode = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(parameter, location, satellite, timestamps) {
    var directories;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _HeatMapServerController["default"].__findOneByParamsAndTimespanRange(parameter, location, satellite, timestamps);

          case 2:
            directories = _context.sent;
            return _context.abrupt("return", directories);

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function getTimeNode(_x, _x2, _x3, _x4) {
    return _ref.apply(this, arguments);
  };
}();

exports.getTimeNode = getTimeNode;

var getChangeLayerTimeNode = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(parameter, location, satellite, timestamps) {
    var directories;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _HeatMapServerController["default"].__findChangeLayerByParamsAndTimespanRange(parameter, location, satellite, timestamps);

          case 2:
            directories = _context2.sent;
            console.log("directories :>> ", directories);
            return _context2.abrupt("return", directories);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function getChangeLayerTimeNode(_x5, _x6, _x7, _x8) {
    return _ref2.apply(this, arguments);
  };
}();

exports.getChangeLayerTimeNode = getChangeLayerTimeNode;

var generateUrl = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(timestamps, params) {
    var timeNode, url;
    return _regenerator["default"].wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return getTimeNode(params.parameter, params.location, params.satellite, timestamps);

          case 2:
            timeNode = _context3.sent;
            timeNode = timeNode[0];
            url = "";

            if (!timeNode) {
              _context3.next = 15;
              break;
            }

            if (!(timeNode.parameter && timeNode.location && timeNode.satellite && timeNode.timespan)) {
              _context3.next = 10;
              break;
            }

            url = "".concat(timeNode.parameter, "/").concat(timeNode.location, "/").concat(timeNode.satellite, "/").concat(timeNode.timespan);
            _context3.next = 15;
            break;

          case 10:
            if (!(timeNode.parameter && timeNode.location && !timeNode.satellite && timeNode.timespan)) {
              _context3.next = 14;
              break;
            }

            url = "".concat(timeNode.parameter, "/").concat(timeNode.location, "/").concat(timeNode.timespan);
            _context3.next = 15;
            break;

          case 14:
            return _context3.abrupt("return", -1);

          case 15:
            console.log("url :>> ", url);
            return _context3.abrupt("return", url);

          case 17:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));

  return function generateUrl(_x9, _x10) {
    return _ref3.apply(this, arguments);
  };
}();

exports.generateUrl = generateUrl;

var generateChangeUrl = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(timestamps, params) {
    var timeNode, url;
    return _regenerator["default"].wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return getChangeLayerTimeNode(params.parameter, params.location, params.satellite, timestamps);

          case 2:
            timeNode = _context4.sent;
            timeNode = timeNode[0];
            url = "";

            if (!timeNode) {
              _context4.next = 15;
              break;
            }

            if (!(timeNode.parameter && timeNode.location && timeNode.satellite && timeNode.timespan)) {
              _context4.next = 10;
              break;
            }

            url = "".concat(timeNode.parameter, "/").concat(timeNode.location, "/").concat(timeNode.satellite, "/").concat(timeNode.timespan);
            _context4.next = 15;
            break;

          case 10:
            if (!(timeNode.parameter && timeNode.location && !timeNode.satellite && timeNode.timespan)) {
              _context4.next = 14;
              break;
            }

            url = "".concat(timeNode.parameter, "/").concat(timeNode.location, "/").concat(timeNode.timespan);
            _context4.next = 15;
            break;

          case 14:
            return _context4.abrupt("return", -1);

          case 15:
            console.log("url :>> ", url);
            return _context4.abrupt("return", url);

          case 17:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));

  return function generateChangeUrl(_x11, _x12) {
    return _ref4.apply(this, arguments);
  };
}();

exports.generateChangeUrl = generateChangeUrl;

var init = /*#__PURE__*/function () {
  var _ref5 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5() {
    return _regenerator["default"].wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            setInterval(function () {
              _addresses.adresses.forEach(function (adress) {
                getTimeDirectories(adress.base, adress.params);
              });
            }, 600000);

          case 1:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));

  return function init() {
    return _ref5.apply(this, arguments);
  };
}();

exports.init = init;