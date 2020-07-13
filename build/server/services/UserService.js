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

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _models = _interopRequireDefault(require("../api/models"));

var _generatePassword = _interopRequireDefault(require("generate-password"));

var _fs = require("fs");

var _require = require("sequelize"),
    Op = _require.Op;

var state = require("../constants/userStates");

var UserService = /*#__PURE__*/function () {
  function UserService() {
    (0, _classCallCheck2["default"])(this, UserService);
  }

  (0, _createClass2["default"])(UserService, null, [{
    key: "getAllUsers",
    value: function () {
      var _getAllUsers = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
        var users;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _context.next = 3;
                return _models["default"].User.findAll();

              case 3:
                users = _context.sent;
                return _context.abrupt("return", users);

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

      function getAllUsers() {
        return _getAllUsers.apply(this, arguments);
      }

      return getAllUsers;
    }()
  }, {
    key: "getUsersByState",
    value: function () {
      var _getUsersByState = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(targetState) {
        var users;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.prev = 0;

                if (!(targetState === state.Active)) {
                  _context2.next = 7;
                  break;
                }

                _context2.next = 4;
                return _models["default"].User.findAll({
                  where: {
                    state: state.Active
                  }
                });

              case 4:
                users = _context2.sent;
                _context2.next = 17;
                break;

              case 7:
                if (!(targetState === state.Suspend)) {
                  _context2.next = 13;
                  break;
                }

                _context2.next = 10;
                return _models["default"].User.findAll({
                  where: {
                    state: state.Suspend
                  }
                });

              case 10:
                users = _context2.sent;
                _context2.next = 17;
                break;

              case 13:
                if (!(targetState === state.Unconfirmed)) {
                  _context2.next = 17;
                  break;
                }

                _context2.next = 16;
                return _models["default"].User.findAll({
                  where: {
                    state: state.Unconfirmed
                  }
                });

              case 16:
                users = _context2.sent;

              case 17:
                return _context2.abrupt("return", users);

              case 20:
                _context2.prev = 20;
                _context2.t0 = _context2["catch"](0);
                throw _context2.t0;

              case 23:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[0, 20]]);
      }));

      function getUsersByState(_x) {
        return _getUsersByState.apply(this, arguments);
      }

      return getUsersByState;
    }()
  }, {
    key: "IsUserExist",
    value: function () {
      var _IsUserExist = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(newUser) {
        var _where, user;

        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                _context3.next = 3;
                return _models["default"].User.findOne({
                  where: (_where = {}, (0, _defineProperty2["default"])(_where, Op.or, {
                    email: newUser.email,
                    username: newUser.username
                  }), (0, _defineProperty2["default"])(_where, "state", (0, _defineProperty2["default"])({}, Op.not, state.Deleted)), _where)
                })["catch"](function (error) {
                  throw error;
                });

              case 3:
                user = _context3.sent;
                return _context3.abrupt("return", user);

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

      function IsUserExist(_x2) {
        return _IsUserExist.apply(this, arguments);
      }

      return IsUserExist;
    }()
  }, {
    key: "addUser",
    value: function () {
      var _addUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(newUser) {
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                return _context4.abrupt("return", _models["default"].User.create(newUser)["catch"](function (error) {
                  throw error;
                }));

              case 4:
                _context4.prev = 4;
                _context4.t0 = _context4["catch"](0);
                throw _context4.t0.detail;

              case 7:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 4]]);
      }));

      function addUser(_x3) {
        return _addUser.apply(this, arguments);
      }

      return addUser;
    }()
  }, {
    key: "updateUser",
    value: function () {
      var _updateUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(id, updatedUser) {
        var userToUpdate;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.prev = 0;
                _context5.next = 3;
                return _models["default"].User.findOne({
                  where: {
                    id: Number(id)
                  }
                });

              case 3:
                userToUpdate = _context5.sent;

                if (!userToUpdate) {
                  _context5.next = 8;
                  break;
                }

                _context5.next = 7;
                return _models["default"].User.update(updatedUser, {
                  where: {
                    id: Number(id)
                  }
                });

              case 7:
                return _context5.abrupt("return", updatedUser);

              case 8:
                return _context5.abrupt("return", null);

              case 11:
                _context5.prev = 11;
                _context5.t0 = _context5["catch"](0);
                throw _context5.t0;

              case 14:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[0, 11]]);
      }));

      function updateUser(_x4, _x5) {
        return _updateUser.apply(this, arguments);
      }

      return updateUser;
    }()
  }, {
    key: "getAUser",
    value: function () {
      var _getAUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(id) {
        var theUser;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                _context6.prev = 0;
                _context6.next = 3;
                return _models["default"].User.findOne({
                  where: {
                    id: Number(id)
                  }
                });

              case 3:
                theUser = _context6.sent;
                return _context6.abrupt("return", theUser);

              case 7:
                _context6.prev = 7;
                _context6.t0 = _context6["catch"](0);
                throw _context6.t0;

              case 10:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[0, 7]]);
      }));

      function getAUser(_x6) {
        return _getAUser.apply(this, arguments);
      }

      return getAUser;
    }()
  }, {
    key: "getAUserByConfirmationCode",
    value: function () {
      var _getAUserByConfirmationCode = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(code) {
        var theUser;
        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                _context7.prev = 0;
                _context7.next = 3;
                return _models["default"].User.findOne({
                  where: {
                    confirmationCode: code
                  }
                });

              case 3:
                theUser = _context7.sent;
                return _context7.abrupt("return", theUser);

              case 7:
                _context7.prev = 7;
                _context7.t0 = _context7["catch"](0);
                throw _context7.t0;

              case 10:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[0, 7]]);
      }));

      function getAUserByConfirmationCode(_x7) {
        return _getAUserByConfirmationCode.apply(this, arguments);
      }

      return getAUserByConfirmationCode;
    }()
  }, {
    key: "getUserByEmail",
    value: function () {
      var _getUserByEmail = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(email) {
        var theUser;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                _context8.prev = 0;
                _context8.next = 3;
                return _models["default"].User.findOne({
                  where: (0, _defineProperty2["default"])({}, Op.and, {
                    email: email,
                    state: (0, _defineProperty2["default"])({}, Op.not, state.Deleted)
                  })
                });

              case 3:
                theUser = _context8.sent;
                return _context8.abrupt("return", theUser);

              case 7:
                _context8.prev = 7;
                _context8.t0 = _context8["catch"](0);
                throw _context8.t0;

              case 10:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[0, 7]]);
      }));

      function getUserByEmail(_x8) {
        return _getUserByEmail.apply(this, arguments);
      }

      return getUserByEmail;
    }()
  }, {
    key: "deleteUser",
    value: function () {
      var _deleteUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(id) {
        var userToDelete, deletedUser;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                _context9.prev = 0;
                _context9.next = 3;
                return _models["default"].User.findOne({
                  where: {
                    id: Number(id)
                  }
                });

              case 3:
                userToDelete = _context9.sent;

                if (!userToDelete) {
                  _context9.next = 10;
                  break;
                }

                userToDelete.state = state.Deleted;
                _context9.next = 8;
                return _models["default"].User.update(userToDelete, {
                  where: {
                    id: Number(id)
                  }
                });

              case 8:
                deletedUser = _context9.sent;
                return _context9.abrupt("return", deletedUser);

              case 10:
                return _context9.abrupt("return", null);

              case 13:
                _context9.prev = 13;
                _context9.t0 = _context9["catch"](0);
                throw _context9.t0;

              case 16:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, null, [[0, 13]]);
      }));

      function deleteUser(_x9) {
        return _deleteUser.apply(this, arguments);
      }

      return deleteUser;
    }()
  }, {
    key: "changePasswordFromProfile",
    value: function () {
      var _changePasswordFromProfile = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(user, oldPassword, newPassword) {
        var currentUser, isMatch;
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                _context10.next = 2;
                return _models["default"].User.findOne({
                  where: {
                    id: Number(user.id)
                  }
                });

              case 2:
                currentUser = _context10.sent;
                isMatch = _bcrypt["default"].compareSync(oldPassword, currentUser.password);

                if (!isMatch) {
                  _context10.next = 10;
                  break;
                }

                _context10.next = 7;
                return _bcrypt["default"].hash(newPassword, 15).then(function (hash) {
                  user.password = hash;

                  _models["default"].User.update(user, {
                    where: {
                      id: Number(user.id)
                    }
                  });

                  return user;
                })["catch"](function (err) {
                  throw new Error();
                });

              case 7:
                return _context10.abrupt("return", _context10.sent);

              case 10:
                throw new Error("Password is not match");

              case 11:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10);
      }));

      function changePasswordFromProfile(_x10, _x11, _x12) {
        return _changePasswordFromProfile.apply(this, arguments);
      }

      return changePasswordFromProfile;
    }()
  }, {
    key: "resetAUserPasswordByAdmin",
    value: function () {
      var _resetAUserPasswordByAdmin = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(user) {
        var newPassword, succesful;
        return _regenerator["default"].wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                _context11.prev = 0;
                newPassword = _generatePassword["default"].generate({
                  length: 10,
                  numbers: true
                });
                console.log("new pasword", newPassword);
                _context11.next = 5;
                return _bcrypt["default"].hash(newPassword, 15).then(function (hash) {
                  user.password = hash;

                  _models["default"].User.update(user, {
                    where: {
                      id: Number(user.id)
                    }
                  });

                  return newPassword;
                })["catch"](function (err) {
                  throw new Error();
                });

              case 5:
                succesful = _context11.sent;

                if (!succesful) {
                  _context11.next = 10;
                  break;
                }

                return _context11.abrupt("return", newPassword);

              case 10:
                return _context11.abrupt("return", null);

              case 11:
                _context11.next = 16;
                break;

              case 13:
                _context11.prev = 13;
                _context11.t0 = _context11["catch"](0);
                throw new Error();

              case 16:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, null, [[0, 13]]);
      }));

      function resetAUserPasswordByAdmin(_x13) {
        return _resetAUserPasswordByAdmin.apply(this, arguments);
      }

      return resetAUserPasswordByAdmin;
    }()
  }, {
    key: "forgetPassword",
    value: function () {
      var _forgetPassword = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(user) {
        var newPassword, succesful;
        return _regenerator["default"].wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.prev = 0;
                newPassword = _generatePassword["default"].generate({
                  length: 10,
                  numbers: true
                });
                console.log("new pasword", newPassword);
                _context12.next = 5;
                return _bcrypt["default"].hash(newPassword, 15).then(function (hash) {
                  user.password = hash;

                  _models["default"].User.update(user, {
                    where: {
                      id: Number(user.id)
                    }
                  });

                  return newPassword;
                })["catch"](function (err) {
                  throw new Error();
                });

              case 5:
                succesful = _context12.sent;

                if (!succesful) {
                  _context12.next = 10;
                  break;
                }

                return _context12.abrupt("return", newPassword);

              case 10:
                return _context12.abrupt("return", null);

              case 11:
                _context12.next = 16;
                break;

              case 13:
                _context12.prev = 13;
                _context12.t0 = _context12["catch"](0);
                throw new Error();

              case 16:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, null, [[0, 13]]);
      }));

      function forgetPassword(_x14) {
        return _forgetPassword.apply(this, arguments);
      }

      return forgetPassword;
    }()
  }]);
  return UserService;
}();

var _default = UserService;
exports["default"] = _default;