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

var _LocationServices = _interopRequireDefault(require("../services/LocationServices"));

_dotenv["default"].config();

var util = new _Utils["default"]();

var LocationController = /*#__PURE__*/function () {
  function LocationController() {
    (0, _classCallCheck2["default"])(this, LocationController);
  }

  (0, _createClass2["default"])(LocationController, null, [{
    key: "getAll",
    value: function () {
      var _getAll = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var locations;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _LocationServices["default"].getAll();

              case 3:
                locations = _context.sent;

                if (locations.length > 0) {
                  util.setSuccess(200, "locations retrieved successfully", locations);
                } else {
                  util.setSuccess(200, "No locations found.");
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
                return _LocationServices["default"].find(searchedPhrase);

              case 5:
                result = _context2.sent;

                if (!result.length) {
                  _context2.next = 11;
                  break;
                }

                util.setSuccess(200, "Successfully fetched.", result);
                return _context2.abrupt("return", util.send(res));

              case 11:
                util.setSuccess(200, "No Location found.");
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
        var newLocation, result;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                newLocation = req.body;
                console.log(newLocation);

                if (!(!newLocation.Name || !newLocation.KeyWords || !newLocation.lat || !newLocation.lon)) {
                  _context3.next = 8;
                  break;
                }

                util.setError(400, "Please provide complete details.");
                return _context3.abrupt("return", util.send(res));

              case 8:
                _context3.next = 10;
                return _LocationServices["default"].add(newLocation);

              case 10:
                result = _context3.sent;

                if (!result) {
                  _context3.next = 16;
                  break;
                }

                util.setSuccess(200, "Successfully Added.", result);
                return _context3.abrupt("return", util.send(res));

              case 16:
                util.setError(500, "An internal error occured!");
                return _context3.abrupt("return", util.send(res));

              case 18:
                _context3.next = 24;
                break;

              case 20:
                _context3.prev = 20;
                _context3.t0 = _context3["catch"](0);
                util.setError(400, _context3.t0);
                return _context3.abrupt("return", util.send(res));

              case 24:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 20]]);
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
        var newupdatedLocation, id, updatedLocationResult;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                newupdatedLocation = req.body;
                id = req.params.id;

                if (Number(id)) {
                  _context4.next = 5;
                  break;
                }

                util.setError(400, "Please input a valid numeric value");
                return _context4.abrupt("return", util.send(res));

              case 5:
                _context4.prev = 5;
                _context4.next = 8;
                return _LocationServices["default"].update(id, newupdatedLocation);

              case 8:
                updatedLocationResult = _context4.sent;

                if (!updatedLocationResult) {
                  util.setError(400, "Cannot find location with the id: ".concat(id));
                } else {
                  util.setSuccess(200, "Location updated", updatedLocationResult);
                }

                return _context4.abrupt("return", util.send(res));

              case 13:
                _context4.prev = 13;
                _context4.t0 = _context4["catch"](5);
                console.log(_context4.t0);
                util.setError(500, "An Internal error occured");
                return _context4.abrupt("return", util.send(res));

              case 18:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[5, 13]]);
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
        var id, deletedLocationResult;
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
                return _LocationServices["default"]["delete"](id);

              case 7:
                deletedLocationResult = _context5.sent;

                if (!deletedLocationResult) {
                  util.setError(400, "Cannot find location with the id: ".concat(id));
                } else {
                  util.setSuccess(200, "Location deleted");
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
  return LocationController;
}();

var _default = LocationController;
exports["default"] = _default;