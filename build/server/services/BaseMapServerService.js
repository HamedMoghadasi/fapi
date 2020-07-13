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

var BaseMapServerService = /*#__PURE__*/function () {
  function BaseMapServerService() {
    (0, _classCallCheck2["default"])(this, BaseMapServerService);
  }

  (0, _createClass2["default"])(BaseMapServerService, null, [{
    key: "getAll",
    value: function () {
      var _getAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var baseMapServer;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _models["default"].BaseMapServer.findAll({});

              case 3:
                baseMapServer = _context.sent;
                return _context.abrupt("return", baseMapServer);

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
    key: "find",
    value: function () {
      var _find = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(searchedPhrase) {
        var baseMapServer;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                console.log("searchedPhrase", searchedPhrase);
                _context2.prev = 1;
                _context2.next = 4;
                return _models["default"].BaseMapServer.findAll({
                  where: (0, _defineProperty2["default"])({}, Op.or, {
                    Name: (0, _defineProperty2["default"])({}, Op.like, "%" + searchedPhrase + "%"),
                    KeyWords: (0, _defineProperty2["default"])({}, Op.like, "%" + searchedPhrase + "%")
                  })
                });

              case 4:
                baseMapServer = _context2.sent;
                return _context2.abrupt("return", baseMapServer);

              case 8:
                _context2.prev = 8;
                _context2.t0 = _context2["catch"](1);
                throw _context2.t0;

              case 11:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[1, 8]]);
      }));

      function find(_x) {
        return _find.apply(this, arguments);
      }

      return find;
    }()
  }, {
    key: "add",
    value: function () {
      var _add = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(newBaseMapServer) {
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                return _context3.abrupt("return", _models["default"].BaseMapServer.create(newBaseMapServer)["catch"](function (error) {
                  throw error;
                }));

              case 4:
                _context3.prev = 4;
                _context3.t0 = _context3["catch"](0);
                throw _context3.t0.detail;

              case 7:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 4]]);
      }));

      function add(_x2) {
        return _add.apply(this, arguments);
      }

      return add;
    }()
  }, {
    key: "update",
    value: function () {
      var _update = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(id, updatedBaseMapServer) {
        var BaseMapServerToUpdate;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return _models["default"].BaseMapServer.findOne({
                  where: {
                    id: Number(id)
                  }
                });

              case 3:
                BaseMapServerToUpdate = _context4.sent;

                if (!BaseMapServerToUpdate) {
                  _context4.next = 8;
                  break;
                }

                _context4.next = 7;
                return _models["default"].BaseMapServer.update(updatedBaseMapServer, {
                  where: {
                    id: Number(id)
                  }
                });

              case 7:
                return _context4.abrupt("return", updatedBaseMapServer);

              case 8:
                return _context4.abrupt("return", null);

              case 11:
                _context4.prev = 11;
                _context4.t0 = _context4["catch"](0);
                throw _context4.t0;

              case 14:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 11]]);
      }));

      function update(_x3, _x4) {
        return _update.apply(this, arguments);
      }

      return update;
    }()
  }, {
    key: "delete",
    value: function () {
      var _delete2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(id) {
        var BaseMapServerToDelete, deletedBaseMapServer;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return _models["default"].BaseMapServer.findOne({
                  where: {
                    id: Number(id)
                  }
                });

              case 3:
                BaseMapServerToDelete = _context5.sent;

                if (!BaseMapServerToDelete) {
                  _context5.next = 9;
                  break;
                }

                _context5.next = 7;
                return _models["default"].BaseMapServer.destroy({
                  where: {
                    id: Number(id)
                  }
                });

              case 7:
                deletedBaseMapServer = _context5.sent;
                return _context5.abrupt("return", deletedBaseMapServer);

              case 9:
                return _context5.abrupt("return", null);

              case 12:
                _context5.prev = 12;
                _context5.t0 = _context5["catch"](0);
                throw _context5.t0;

              case 15:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 12]]);
      }));

      function _delete(_x5) {
        return _delete2.apply(this, arguments);
      }

      return _delete;
    }()
  }]);
  return BaseMapServerService;
}();

exports["default"] = BaseMapServerService;