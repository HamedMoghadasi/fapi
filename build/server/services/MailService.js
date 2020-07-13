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

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _dotenv = _interopRequireDefault(require("dotenv"));

_dotenv["default"].config();

var url = process.env.HOST_URL;

var MailService = /*#__PURE__*/function () {
  function MailService() {
    (0, _classCallCheck2["default"])(this, MailService);
  }

  (0, _createClass2["default"])(MailService, null, [{
    key: "Send",
    value: function () {
      var _Send = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(emails, subject, body) {
        var transporter, mailOptions;
        return _regenerator["default"].wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                console.log(emails);
                transporter = _nodemailer["default"].createTransport({
                  host: "webmail.developair.ir",
                  port: 587,
                  secure: false,
                  // upgrade later with STARTTLS
                  auth: {
                    user: "fater@developair.ir",
                    pass: "Hamed@123456"
                  }
                });
                mailOptions = {
                  from: "fater@developair.ir",
                  to: emails,
                  subject: "".concat(subject),
                  html: "".concat(body)
                };
                console.log(mailOptions);
                transporter.sendMail(mailOptions, function (error, info) {
                  if (error) {
                    console.log(error);
                  } else {
                    console.log("Email sent: " + info.response);
                  }
                });

              case 5:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function Send(_x, _x2, _x3) {
        return _Send.apply(this, arguments);
      }

      return Send;
    }()
  }, {
    key: "prepareResetPasswordMailBody",
    value: function prepareResetPasswordMailBody(newPassword) {
      return "<h1>Your new Password is <span style=\"color:green;\">".concat(newPassword, "</span></h1>");
    }
  }, {
    key: "prepareUserRegisterMailBody",
    value: function prepareUserRegisterMailBody(confirmationCode) {
      var activationUrl = "".concat(url, "/api/v1/auth/confirmation/").concat(confirmationCode);
      return "<h1><a href='".concat(activationUrl, "' \n    style=\"text-decoration: none;\n    color: black;\n    border: 1px solid #106d26;\n    border-radius: 5px;\n    padding: 10px;\n    background: #28a745;\"\n    >\u0641\u0639\u0627\u0644\u0633\u0627\u0632\u06CC \u062D\u0633\u0627\u0628 \u06A9\u0627\u0631\u0628\u0631\u06CC</a></h1>");
    }
  }]);
  return MailService;
}();

exports["default"] = MailService;