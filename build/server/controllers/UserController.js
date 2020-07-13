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

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

var util = new _Utils["default"]();

var state = require("../constants/userStates");

var userActivity = require("../constants/userActivity");

var UserController = /*#__PURE__*/function () {
  function UserController() {
    (0, _classCallCheck2["default"])(this, UserController);
  }

  (0, _createClass2["default"])(UserController, null, [{
    key: "logout",
    value: function () {
      var _logout = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(req, res) {
        var _id;

        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                _id = req.user.id;

                if (!Number(_id)) {
                  _context.next = 9;
                  break;
                }

                _context.next = 5;
                return _UserActivityLogService["default"].Log(userActivity.Logout, _id);

              case 5:
                util.setSuccess(200, "Successfully Logouted.");
                return _context.abrupt("return", util.send(res));

              case 9:
                util.setError(400, "This user was not logined.");
                return _context.abrupt("return", util.send(res));

              case 11:
                _context.next = 17;
                break;

              case 13:
                _context.prev = 13;
                _context.t0 = _context["catch"](0);
                util.setError(400, _context.t0);
                return _context.abrupt("return", util.send(res));

              case 17:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, null, [[0, 13]]);
      }));

      function logout(_x, _x2) {
        return _logout.apply(this, arguments);
      }

      return logout;
    }()
  }, {
    key: "login",
    value: function () {
      var _login = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(req, res) {
        var theUser;
        return _regenerator["default"].wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                if (!(!req.body.email || !req.body.password || !req.body.rememberMe || !req.body.captcha)) {
                  _context2.next = 5;
                  break;
                }

                util.setError(400, "Please provide complete details", {
                  code: 4001,
                  body: req.body
                });
                return _context2.abrupt("return", util.send(res));

              case 5:
                if (!(req.body.captcha.indexOf(process.env.CAPTCHA_SECRET) === -1 || req.body.captcha.length !== 64)) {
                  _context2.next = 8;
                  break;
                }

                util.setError(400, "Captcha is not valid", {
                  code: 4001
                });
                return _context2.abrupt("return", util.send(res));

              case 8:
                _context2.prev = 8;
                _context2.next = 11;
                return _UserService["default"].getUserByEmail(req.body.email);

              case 11:
                theUser = _context2.sent;

                if (!theUser) {
                  _context2.next = 27;
                  break;
                }

                _context2.next = 15;
                return _UserActivityLogService["default"].Log(userActivity.Login, theUser.id);

              case 15:
                theUser.rememberMe = req.body.rememberMe === "true";

                if (!theUser.isEmailConfirmed) {
                  _context2.next = 23;
                  break;
                }

                if (!(theUser.state === state.Suspend || theUser.state === state.Unconfirmed || theUser.state === state.Deleted)) {
                  _context2.next = 20;
                  break;
                }

                util.setError(403, "Your account is not active.", {
                  code: 4031
                });
                return _context2.abrupt("return", util.send(res));

              case 20:
                _bcrypt["default"].compare(req.body.password, theUser.password, function (error, result) {
                  if (result) {
                    _Jwt["default"].generateToken(theUser).then(function (token) {
                      util.setSuccess(200, "Successfully logined.", {
                        token: token
                      });
                      return util.send(res);
                    });
                  } else {
                    util.setError(400, "Password is wrong", {
                      code: 4002
                    });
                    return util.send(res);
                  }
                });

                _context2.next = 25;
                break;

              case 23:
                util.setError(400, "User is not activated.Please confirm your email or contact your administration.");
                return _context2.abrupt("return", util.send(res));

              case 25:
                _context2.next = 29;
                break;

              case 27:
                util.setError(400, "There's not exist such a user with this email", {
                  code: 4003
                });
                return _context2.abrupt("return", util.send(res));

              case 29:
                _context2.next = 36;
                break;

              case 31:
                _context2.prev = 31;
                _context2.t0 = _context2["catch"](8);
                console.log(_context2.t0);
                util.setError(400, _context2.t0);
                return _context2.abrupt("return", util.send(res));

              case 36:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, null, [[8, 31]]);
      }));

      function login(_x3, _x4) {
        return _login.apply(this, arguments);
      }

      return login;
    }()
  }, {
    key: "getUsersByState",
    value: function () {
      var _getUsersByState = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee3(req, res) {
        var targetState, users;
        return _regenerator["default"].wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.prev = 0;
                targetState = req.params.targetState;

                if (!(targetState === state.Active || targetState === state.Suspend || targetState === state.Unconfirmed)) {
                  _context3.next = 10;
                  break;
                }

                _context3.next = 5;
                return _UserService["default"].getUsersByState(targetState);

              case 5:
                users = _context3.sent;

                if (users.length > 0) {
                  util.setSuccess(200, "".concat(targetState, " users retrieved"), users);
                } else {
                  util.setSuccess(200, "No user found with this state:".concat(targetState));
                }

                return _context3.abrupt("return", util.send(res));

              case 10:
                util.setError(400, "Passed state is not valid.");
                return _context3.abrupt("return", util.send(res));

              case 12:
                _context3.next = 18;
                break;

              case 14:
                _context3.prev = 14;
                _context3.t0 = _context3["catch"](0);
                util.setError(400, _context3.t0);
                return _context3.abrupt("return", util.send(res));

              case 18:
              case "end":
                return _context3.stop();
            }
          }
        }, _callee3, null, [[0, 14]]);
      }));

      function getUsersByState(_x5, _x6) {
        return _getUsersByState.apply(this, arguments);
      }

      return getUsersByState;
    }()
  }, {
    key: "getAllUsers",
    value: function () {
      var _getAllUsers = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee4(req, res) {
        var allUsers;
        return _regenerator["default"].wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.prev = 0;
                _context4.next = 3;
                return _UserService["default"].getAllUsers();

              case 3:
                allUsers = _context4.sent;

                if (allUsers.length > 0) {
                  util.setSuccess(200, "Users retrieved", allUsers);
                } else {
                  util.setSuccess(200, "No user found");
                }

                return _context4.abrupt("return", util.send(res));

              case 8:
                _context4.prev = 8;
                _context4.t0 = _context4["catch"](0);
                util.setError(400, _context4.t0);
                return _context4.abrupt("return", util.send(res));

              case 12:
              case "end":
                return _context4.stop();
            }
          }
        }, _callee4, null, [[0, 8]]);
      }));

      function getAllUsers(_x7, _x8) {
        return _getAllUsers.apply(this, arguments);
      }

      return getAllUsers;
    }()
  }, {
    key: "addUser",
    value: function () {
      var _addUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee5(req, res) {
        var newUser, userExisted, createdUser, body;
        return _regenerator["default"].wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                if (!(!req.body.email || !req.body.username || !req.body.password)) {
                  _context5.next = 3;
                  break;
                }

                util.setError(400, "Please provide complete details");
                return _context5.abrupt("return", util.send(res));

              case 3:
                newUser = req.body;
                _context5.prev = 4;
                _context5.next = 7;
                return _UserService["default"].IsUserExist(newUser);

              case 7:
                userExisted = _context5.sent;

                if (!userExisted) {
                  _context5.next = 12;
                  break;
                }

                if (newUser.email === userExisted.email) {
                  util.setError(400, "Email must be unique");
                } else if (newUser.username === userExisted.username) {
                  util.setError(400, "Username must be unique");
                }

                _context5.next = 18;
                break;

              case 12:
                _context5.next = 14;
                return _UserService["default"].addUser(newUser);

              case 14:
                createdUser = _context5.sent;
                body = _MailService["default"].prepareUserRegisterMailBody(createdUser.confirmationCode);

                _MailService["default"].Send([createdUser.email], "Fater GIS Registeration", body);

                util.setSuccess(201, "Successfull! \n A confirmation email send for you.", createdUser);

              case 18:
                return _context5.abrupt("return", util.send(res));

              case 21:
                _context5.prev = 21;
                _context5.t0 = _context5["catch"](4);
                util.setError(400, _context5.t0.errors[0].message);
                return _context5.abrupt("return", util.send(res));

              case 25:
              case "end":
                return _context5.stop();
            }
          }
        }, _callee5, null, [[4, 21]]);
      }));

      function addUser(_x9, _x10) {
        return _addUser.apply(this, arguments);
      }

      return addUser;
    }()
  }, {
    key: "confirmUser",
    value: function () {
      var _confirmUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee6(req, res) {
        var code, targetUser, updateUser;
        return _regenerator["default"].wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                code = req.params.code;
                console.log(code);

                if (!(code.length < 0)) {
                  _context6.next = 5;
                  break;
                }

                util.setError(400, "confirmation code is not valid");
                return _context6.abrupt("return", util.send(res));

              case 5:
                _context6.prev = 5;
                _context6.next = 8;
                return _UserService["default"].getAUserByConfirmationCode(code);

              case 8:
                targetUser = _context6.sent;

                if (targetUser) {
                  _context6.next = 13;
                  break;
                }

                util.setError(404, "confirmation code is not valid");
                _context6.next = 20;
                break;

              case 13:
                targetUser.confirmationCode = (0, _v["default"])();
                targetUser.isEmailConfirmed = true;
                targetUser.state = state.Active;
                _context6.next = 18;
                return _UserService["default"].updateUser(targetUser.id, targetUser);

              case 18:
                updateUser = _context6.sent;

                if (!updateUser) {
                  util.setError(404, "Cannot find user with the id: ".concat(id));
                } else {
                  util.setSuccess(200, "User Activated!", {
                    isEmailConfirmed: updateUser.isEmailConfirmed
                  });
                }

              case 20:
                return _context6.abrupt("return", util.send(res));

              case 23:
                _context6.prev = 23;
                _context6.t0 = _context6["catch"](5);
                util.setError(404, _context6.t0);
                return _context6.abrupt("return", util.send(res));

              case 27:
              case "end":
                return _context6.stop();
            }
          }
        }, _callee6, null, [[5, 23]]);
      }));

      function confirmUser(_x11, _x12) {
        return _confirmUser.apply(this, arguments);
      }

      return confirmUser;
    }()
  }, {
    key: "updateUser",
    value: function () {
      var _updateUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee7(req, res) {
        var alteredUser, id, _updateUser2;

        return _regenerator["default"].wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                alteredUser = req.body;
                id = req.params.id;

                if (Number(id)) {
                  _context7.next = 5;
                  break;
                }

                util.setError(400, "Please input a valid numeric value");
                return _context7.abrupt("return", util.send(res));

              case 5:
                _context7.prev = 5;
                _context7.next = 8;
                return _UserService["default"].updateUser(id, alteredUser);

              case 8:
                _updateUser2 = _context7.sent;

                if (!_updateUser2) {
                  util.setError(404, "Cannot find user with the id: ".concat(id));
                } else {
                  util.setSuccess(200, "User updated", _updateUser2);
                }

                return _context7.abrupt("return", util.send(res));

              case 13:
                _context7.prev = 13;
                _context7.t0 = _context7["catch"](5);
                util.setError(404, _context7.t0);
                return _context7.abrupt("return", util.send(res));

              case 17:
              case "end":
                return _context7.stop();
            }
          }
        }, _callee7, null, [[5, 13]]);
      }));

      function updateUser(_x13, _x14) {
        return _updateUser.apply(this, arguments);
      }

      return updateUser;
    }()
  }, {
    key: "getAUser",
    value: function () {
      var _getAUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee8(req, res) {
        var id, theUser;
        return _regenerator["default"].wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                id = req.params.id;

                if (Number(id)) {
                  _context8.next = 4;
                  break;
                }

                util.setError(400, "Please input a valid numeric value");
                return _context8.abrupt("return", util.send(res));

              case 4:
                _context8.prev = 4;
                _context8.next = 7;
                return _UserService["default"].getAUser(id);

              case 7:
                theUser = _context8.sent;

                if (!theUser) {
                  util.setError(404, "Cannot find user with the id ".concat(id));
                } else {
                  util.setSuccess(200, "Found User", theUser);
                }

                return _context8.abrupt("return", util.send(res));

              case 12:
                _context8.prev = 12;
                _context8.t0 = _context8["catch"](4);
                util.setError(404, _context8.t0);
                return _context8.abrupt("return", util.send(res));

              case 16:
              case "end":
                return _context8.stop();
            }
          }
        }, _callee8, null, [[4, 12]]);
      }));

      function getAUser(_x15, _x16) {
        return _getAUser.apply(this, arguments);
      }

      return getAUser;
    }()
  }, {
    key: "deleteUser",
    value: function () {
      var _deleteUser = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee9(req, res) {
        var id, userToDelete;
        return _regenerator["default"].wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                id = req.params.id;

                if (Number(id)) {
                  _context9.next = 4;
                  break;
                }

                util.setError(400, "Please provide a numeric value");
                return _context9.abrupt("return", util.send(res));

              case 4:
                _context9.prev = 4;
                _context9.next = 7;
                return _UserService["default"].deleteUser(id);

              case 7:
                userToDelete = _context9.sent;

                if (userToDelete) {
                  util.setSuccess(200, "User deleted");
                } else {
                  util.setError(404, "User with the id ".concat(id, " cannot be found"));
                }

                return _context9.abrupt("return", util.send(res));

              case 12:
                _context9.prev = 12;
                _context9.t0 = _context9["catch"](4);
                util.setError(400, _context9.t0);
                return _context9.abrupt("return", util.send(res));

              case 16:
              case "end":
                return _context9.stop();
            }
          }
        }, _callee9, null, [[4, 12]]);
      }));

      function deleteUser(_x17, _x18) {
        return _deleteUser.apply(this, arguments);
      }

      return deleteUser;
    }()
  }, {
    key: "getUserAccount",
    value: function () {
      var _getUserAccount = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee10(req, res) {
        var id, theUser;
        return _regenerator["default"].wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                id = req.user.id;

                if (Number(id)) {
                  _context10.next = 4;
                  break;
                }

                util.setError(400, "Please input a valid numeric value");
                return _context10.abrupt("return", util.send(res));

              case 4:
                _context10.prev = 4;
                _context10.next = 7;
                return _UserService["default"].getAUser(id);

              case 7:
                theUser = _context10.sent;

                if (!theUser) {
                  util.setError(404, "Cannot find user with the id ".concat(id));
                } else {
                  util.setSuccess(200, "Found User", theUser);
                }

                return _context10.abrupt("return", util.send(res));

              case 12:
                _context10.prev = 12;
                _context10.t0 = _context10["catch"](4);
                util.setError(404, _context10.t0);
                return _context10.abrupt("return", util.send(res));

              case 16:
              case "end":
                return _context10.stop();
            }
          }
        }, _callee10, null, [[4, 12]]);
      }));

      function getUserAccount(_x19, _x20) {
        return _getUserAccount.apply(this, arguments);
      }

      return getUserAccount;
    }()
  }, {
    key: "updateUserAccount",
    value: function () {
      var _updateUserAccount = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee11(req, res) {
        var id, alteredUser, updateUser;
        return _regenerator["default"].wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                id = req.user.id;
                alteredUser = req.body;

                if (Number(id)) {
                  _context11.next = 5;
                  break;
                }

                util.setError(400, "Please input a valid numeric value");
                return _context11.abrupt("return", util.send(res));

              case 5:
                _context11.prev = 5;
                _context11.next = 8;
                return _UserService["default"].updateUser(id, alteredUser);

              case 8:
                updateUser = _context11.sent;

                if (!updateUser) {
                  util.setError(404, "Cannot find user with the id: ".concat(id));
                } else {
                  util.setSuccess(200, "User updated", updateUser);
                }

                return _context11.abrupt("return", util.send(res));

              case 13:
                _context11.prev = 13;
                _context11.t0 = _context11["catch"](5);
                util.setError(404, _context11.t0);
                return _context11.abrupt("return", util.send(res));

              case 17:
              case "end":
                return _context11.stop();
            }
          }
        }, _callee11, null, [[5, 13]]);
      }));

      function updateUserAccount(_x21, _x22) {
        return _updateUserAccount.apply(this, arguments);
      }

      return updateUserAccount;
    }()
  }, {
    key: "deleteUserAccount",
    value: function () {
      var _deleteUserAccount = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee12(req, res) {
        var id, userToDelete;
        return _regenerator["default"].wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                id = req.user.id;

                if (Number(id)) {
                  _context12.next = 4;
                  break;
                }

                util.setError(400, "Please provide a numeric value");
                return _context12.abrupt("return", util.send(res));

              case 4:
                _context12.prev = 4;
                _context12.next = 7;
                return _UserService["default"].deleteUser(id);

              case 7:
                userToDelete = _context12.sent;

                if (userToDelete) {
                  util.setSuccess(200, "User deleted");
                } else {
                  util.setError(404, "User with the id ".concat(id, " cannot be found"));
                }

                return _context12.abrupt("return", util.send(res));

              case 12:
                _context12.prev = 12;
                _context12.t0 = _context12["catch"](4);
                util.setError(400, _context12.t0);
                return _context12.abrupt("return", util.send(res));

              case 16:
              case "end":
                return _context12.stop();
            }
          }
        }, _callee12, null, [[4, 12]]);
      }));

      function deleteUserAccount(_x23, _x24) {
        return _deleteUserAccount.apply(this, arguments);
      }

      return deleteUserAccount;
    }()
  }, {
    key: "changeState",
    value: function () {
      var _changeState = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee13(req, res) {
        var alteredUser, id, updateUser;
        return _regenerator["default"].wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                alteredUser = req.body;
                id = req.params.id;

                if (Number(id)) {
                  _context13.next = 5;
                  break;
                }

                util.setError(400, "Please input a valid numeric value");
                return _context13.abrupt("return", util.send(res));

              case 5:
                _context13.prev = 5;
                _context13.next = 8;
                return _UserService["default"].updateUser(id, alteredUser);

              case 8:
                updateUser = _context13.sent;

                if (!updateUser) {
                  util.setError(404, "Cannot find user with the id: ".concat(id));
                } else {
                  util.setSuccess(200, "User state updated", req.body);
                }

                return _context13.abrupt("return", util.send(res));

              case 13:
                _context13.prev = 13;
                _context13.t0 = _context13["catch"](5);
                util.setError(404, _context13.t0);
                return _context13.abrupt("return", util.send(res));

              case 17:
              case "end":
                return _context13.stop();
            }
          }
        }, _callee13, null, [[5, 13]]);
      }));

      function changeState(_x25, _x26) {
        return _changeState.apply(this, arguments);
      }

      return changeState;
    }()
  }, {
    key: "changePasswordFromProfile",
    value: function () {
      var _changePasswordFromProfile = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee14(req, res) {
        var user, oldPassword, newPassword, updateUserPassword;
        return _regenerator["default"].wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                user = req.user;
                oldPassword = req.body.oldPassword;
                newPassword = req.body.newPassword;

                if (Number(user.id)) {
                  _context14.next = 8;
                  break;
                }

                util.setError(400, "User not found");
                return _context14.abrupt("return", util.send(res));

              case 8:
                if (!(newPassword.length < 0 || newPassword === undefined)) {
                  _context14.next = 13;
                  break;
                }

                util.setError(400, "Invalid input for new password.");
                return _context14.abrupt("return", util.send(res));

              case 13:
                if (!(oldPassword.length < 0 || oldPassword === undefined)) {
                  _context14.next = 16;
                  break;
                }

                util.setError(400, "Invalid input for old password.");
                return _context14.abrupt("return", util.send(res));

              case 16:
                _context14.prev = 16;
                _context14.next = 19;
                return _UserService["default"].changePasswordFromProfile(user, oldPassword, newPassword);

              case 19:
                updateUserPassword = _context14.sent;

                if (!updateUserPassword) {
                  util.setError(500, "Opration Failed.");
                } else {
                  util.setSuccess(200, "Successfull! Your Password changed.");
                }

                return _context14.abrupt("return", util.send(res));

              case 24:
                _context14.prev = 24;
                _context14.t0 = _context14["catch"](16);
                console.log(_context14.t0);
                util.setError(400, _context14.t0);
                return _context14.abrupt("return", util.send(res));

              case 29:
              case "end":
                return _context14.stop();
            }
          }
        }, _callee14, null, [[16, 24]]);
      }));

      function changePasswordFromProfile(_x27, _x28) {
        return _changePasswordFromProfile.apply(this, arguments);
      }

      return changePasswordFromProfile;
    }()
  }, {
    key: "forgetPassword",
    value: function () {
      var _forgetPassword = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee15(req, res) {
        var email, targetedUser, newPassword, body;
        return _regenerator["default"].wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                email = req.body.email;
                _context15.next = 3;
                return _UserService["default"].getUserByEmail(email);

              case 3:
                targetedUser = _context15.sent;

                if (!targetedUser) {
                  _context15.next = 19;
                  break;
                }

                _context15.prev = 5;
                _context15.next = 8;
                return _UserService["default"].forgetPassword(targetedUser);

              case 8:
                newPassword = _context15.sent;

                if (!newPassword) {
                  util.setError(500, "Opration Failed. Please try again.");
                } else {
                  body = _MailService["default"].prepareResetPasswordMailBody(newPassword);
                  console.log(body);

                  _MailService["default"].Send([targetedUser.email], "Fater GIS Reset Password", body);

                  util.setSuccess(200, "Successfull, A message send to your email address, check it out.");
                }

                return _context15.abrupt("return", util.send(res));

              case 13:
                _context15.prev = 13;
                _context15.t0 = _context15["catch"](5);
                util.setError(404, _context15.t0);
                return _context15.abrupt("return", util.send(res));

              case 17:
                _context15.next = 21;
                break;

              case 19:
                util.setError(400, "User not found");
                return _context15.abrupt("return", util.send(res));

              case 21:
              case "end":
                return _context15.stop();
            }
          }
        }, _callee15, null, [[5, 13]]);
      }));

      function forgetPassword(_x29, _x30) {
        return _forgetPassword.apply(this, arguments);
      }

      return forgetPassword;
    }()
  }, {
    key: "resetAUserPasswordByAdmin",
    value: function () {
      var _resetAUserPasswordByAdmin = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee16(req, res) {
        var userId, targetedUser, newPassword, body;
        return _regenerator["default"].wrap(function _callee16$(_context16) {
          while (1) {
            switch (_context16.prev = _context16.next) {
              case 0:
                userId = req.body.userId;

                if (Number(userId)) {
                  _context16.next = 6;
                  break;
                }

                util.setError(400, "Bad request");
                return _context16.abrupt("return", util.send(res));

              case 6:
                _context16.next = 8;
                return _UserService["default"].getAUser(userId);

              case 8:
                targetedUser = _context16.sent;

                if (!targetedUser) {
                  _context16.next = 24;
                  break;
                }

                _context16.prev = 10;
                _context16.next = 13;
                return _UserService["default"].resetAUserPasswordByAdmin(targetedUser);

              case 13:
                newPassword = _context16.sent;

                if (!newPassword) {
                  util.setError(500, "Opration Failed. Please try again.");
                } else {
                  body = _MailService["default"].prepareResetPasswordMailBody(newPassword);
                  console.log(body);

                  _MailService["default"].Send([targetedUser.email], "Fater GIS Reset Password", body);

                  util.setSuccess(200, "Successfull, A message send to your email address, check it out.", newPassword);
                }

                return _context16.abrupt("return", util.send(res));

              case 18:
                _context16.prev = 18;
                _context16.t0 = _context16["catch"](10);
                util.setError(404, _context16.t0);
                return _context16.abrupt("return", util.send(res));

              case 22:
                _context16.next = 26;
                break;

              case 24:
                util.setError(400, "User not found");
                return _context16.abrupt("return", util.send(res));

              case 26:
              case "end":
                return _context16.stop();
            }
          }
        }, _callee16, null, [[10, 18]]);
      }));

      function resetAUserPasswordByAdmin(_x31, _x32) {
        return _resetAUserPasswordByAdmin.apply(this, arguments);
      }

      return resetAUserPasswordByAdmin;
    }()
  }, {
    key: "verifyUser",
    value: function verifyUser(req, res) {
      try {
        var token = req.body.token;

        if (!token) {
          util.setError(403, "Token is not valid");
          return util.send(res);
        } else {
          var result = _Jwt["default"].VerifyToken(token);

          if (result.isValid) {
            util.setSuccess(200, "Verified !", result);
          } else {
            util.setError(403, "Access Denied");
          }
        }

        util.send(res);
      } catch (error) {
        util.setError(403, "Access Denied");
        return util.send(res);
      }
    }
  }, {
    key: "getAuthenticatedUser",
    value: function getAuthenticatedUser(req, res) {
      try {
        var token = req.body.token;

        if (!token) {
          util.setError(403, "Token is not valid");
          return util.send(res);
        } else {
          var result = _Jwt["default"].GetCurrentUserByToken(token);

          if (Object.keys(result).length > 0) {
            util.setSuccess(200, "Verified !", result);
          } else {
            util.setError(403, "Access Denied");
          }
        }

        util.send(res);
      } catch (error) {
        util.setError(403, "Access Denied");
        return util.send(res);
      }
    }
  }]);
  return UserController;
}();

var _default = UserController;
exports["default"] = _default;