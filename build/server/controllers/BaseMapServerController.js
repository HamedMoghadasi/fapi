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

var _BaseMapServerService = _interopRequireDefault(require("../services/BaseMapServerService"));

_dotenv["default"].config();

var util = new _Utils["default"]();

var BaseMapServerController = /*#__PURE__*/function () {
  function BaseMapServerController() {
    (0, _classCallCheck2["default"])(this, BaseMapServerController);
  }

  (0, _createClass2["default"])(BaseMapServerController, null, [{
    key: "getAll",
    value: function () {
      var _getAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var baseMapServers;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _BaseMapServerService["default"].getAll();

              case 3:
                baseMapServers = _context.sent;

                if (baseMapServers.length > 0) {
                  baseMapServers = baseMapServers.map(function (item) {
                    item.imageName = "".concat(process.env.HOST_URL, "/static/images/baselayers/").concat(item.imageName);
                    return item;
                  });
                  util.setSuccess(200, "baseMapServers retrieved successfully", baseMapServers);
                } else {
                  util.setSuccess(200, "No baseMapServers found.");
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
    key: "find",
    value: function () {
      var _find = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var searchedPhrase, result;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;
                searchedPhrase = req.body.searchedPhrase;

                if (!searchedPhrase) {
                  _context2.next = 15;
                  break;
                }

                _context2.next = 5;
                return _BaseMapServerService["default"].find(searchedPhrase);

              case 5:
                result = _context2.sent;

                if (!result.length) {
                  _context2.next = 11;
                  break;
                }

                util.setSuccess(200, "Successfully fetched.", result);
                return _context2.abrupt("return", util.send(res));

              case 11:
                util.setSuccess(200, "No BaseMapServer found.");
                return _context2.abrupt("return", util.send(res));

              case 13:
                _context2.next = 17;
                break;

              case 15:
                util.setError(400, "searched phrase is not valid");
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

      function find(_x3, _x4) {
        return _find.apply(this, arguments);
      }

      return find;
    }()
  }, {
    key: "add",
    value: function () {
      var _add = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var newBaseMapServer, result;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                newBaseMapServer = req.body;
                console.log("newBaseMapServer :>> ", newBaseMapServer);

                if (!(!newBaseMapServer.url || !newBaseMapServer.name || !newBaseMapServer.description || !newBaseMapServer.maxZoom || !req.file)) {
                  _context3.next = 8;
                  break;
                }

                util.setError(400, "Please provide complete details.");
                return _context3.abrupt("return", util.send(res));

              case 8:
                newBaseMapServer.imageName = req.file.filename;
                _context3.next = 11;
                return _BaseMapServerService["default"].add(newBaseMapServer);

              case 11:
                result = _context3.sent;
                result.imageName = "".concat(process.env.HOST_URL, "/static/images/baselayers/").concat(result.imageName);

                if (!result) {
                  _context3.next = 18;
                  break;
                }

                util.setSuccess(200, "Successfully Added.", result);
                return _context3.abrupt("return", util.send(res));

              case 18:
                util.setError(500, "An internal error occured!");
                return _context3.abrupt("return", util.send(res));

              case 20:
                _context3.next = 26;
                break;

              case 22:
                _context3.prev = 22;
                _context3.t0 = _context3["catch"](0);
                util.setError(400, _context3.t0);
                return _context3.abrupt("return", util.send(res));

              case 26:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 22]]);
      }));

      function add(_x5, _x6) {
        return _add.apply(this, arguments);
      }

      return add;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var newupdatedBaseMapServer, id, updatedBaseMapServerResult;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                newupdatedBaseMapServer = req.body;

                if (req.file) {
                  newupdatedBaseMapServer.imageName = req.file.filename;
                }

                id = req.params.id;

                if (Number(id)) {
                  _context4.next = 6;
                  break;
                }

                util.setError(400, "Please input a valid numeric value");
                return _context4.abrupt("return", util.send(res));

              case 6:
                _context4.prev = 6;
                _context4.next = 9;
                return _BaseMapServerService["default"].update(id, newupdatedBaseMapServer);

              case 9:
                updatedBaseMapServerResult = _context4.sent;

                if (updatedBaseMapServerResult.imageName) {
                  updatedBaseMapServerResult.imageName = "".concat(process.env.HOST_URL, "/static/images/baselayers/").concat(updatedBaseMapServerResult.imageName);
                }

                if (!updatedBaseMapServerResult) {
                  util.setError(400, "Cannot find baseMapServer with the id: ".concat(id));
                } else {
                  util.setSuccess(200, "BaseMapServer updated", updatedBaseMapServerResult);
                }

                return _context4.abrupt("return", util.send(res));

              case 15:
                _context4.prev = 15;
                _context4.t0 = _context4["catch"](6);
                console.log(_context4.t0);
                util.setError(500, "An Internal error occured");
                return _context4.abrupt("return", util.send(res));

              case 20:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[6, 15]]);
      }));

      function update(_x7, _x8) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
        var id, deletedBaseMapServerResult;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                id = req.params.id;

                if (Number(id)) {
                  _context5.next = 4;
                  break;
                }

                util.setError(400, "Please input a valid numeric value");
                return _context5.abrupt("return", util.send(res));

              case 4:
                _context5.prev = 4;
                _context5.next = 7;
                return _BaseMapServerService["default"]["delete"](id);

              case 7:
                deletedBaseMapServerResult = _context5.sent;

                if (!deletedBaseMapServerResult) {
                  util.setError(400, "Cannot find baseMapServer with the id: ".concat(id));
                } else {
                  util.setSuccess(200, "BaseMapServer deleted");
                }

                return _context5.abrupt("return", util.send(res));

              case 12:
                _context5.prev = 12;
                _context5.t0 = _context5["catch"](4);
                console.log(_context5.t0);
                util.setError(500, "An Internal error occured");
                return _context5.abrupt("return", util.send(res));

              case 17:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[4, 12]]);
      }));

      function _delete(_x9, _x10) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }]);
  return BaseMapServerController;
}();

var _default = BaseMapServerController;
exports["default"] = _default;