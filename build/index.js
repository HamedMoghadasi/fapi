"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = _interopRequireDefault(require("express"));

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _UserRoutes = _interopRequireDefault(require("./server/routes/UserRoutes"));

var _AuthRouter = _interopRequireDefault(require("./server/routes/AuthRouter"));

var _JWTRouter = _interopRequireDefault(require("./server/routes/JWTRouter"));

var _LocationRoute = _interopRequireDefault(require("./server/routes/LocationRoute"));

var _BaseMapServerRouter = _interopRequireDefault(require("./server/routes/BaseMapServerRouter"));

var _CustomLayerFileRouter = _interopRequireDefault(require("./server/routes/CustomLayerFileRouter"));

var _UserProfileRouter = _interopRequireDefault(require("./server/routes/UserProfileRouter"));

var _UserActivityLogRouter = _interopRequireDefault(require("./server/routes/UserActivityLogRouter"));

var _Jwt = _interopRequireDefault(require("./server/utils/Jwt"));

var _cors = _interopRequireDefault(require("cors"));

var _CaptchaController = _interopRequireDefault(require("./server/controllers/CaptchaController"));

var app = new _express["default"]();

_dotenv["default"].config();

global.__basedir = __dirname;
var corsConfig = process.env.NODE_ENV !== "production" ? {
  origin: [process.env.CORS_ORIGIN_Localhost, process.env.CORS_ORIGIN_IP],
  credentials: true
} : {
  origin: [process.env.CORS_ORIGIN_Localhost, process.env.CORS_ORIGIN_IP],
  credentials: true
};
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: false
}));
app.use((0, _cors["default"])(corsConfig));
var port = process.env.PORT || 3505;
app.use("/static", _express["default"]["static"](__dirname + "/server/assets"));
app.get("/api/v1/captcha", _CaptchaController["default"].Get);
app.use("/api/v1/Location", _LocationRoute["default"]);
app.use("/api/v1/baseMapServer", _BaseMapServerRouter["default"]);
app.use("/api/v1/customVectorFile", _CustomLayerFileRouter["default"]);
app.use("/api/v1/auth", _AuthRouter["default"]);
app.use("/api/v1/jwt/expiration", _Jwt["default"].validateToken, _JWTRouter["default"]);
app.use("/api/v1/admin/users", _Jwt["default"].validateToken, _UserRoutes["default"]);
app.use("/api/v1/admin/UserActivityLogs", _Jwt["default"].validateToken, _UserActivityLogRouter["default"]);
app.use("/api/v1/profile/user", _Jwt["default"].validateToken, _UserProfileRouter["default"]);
app.listen(port, function () {
  console.log("Server is running on PORT :: ".concat(port));
});
var _default = app;
exports["default"] = _default;