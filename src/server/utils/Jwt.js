import * as jwt from "jsonwebtoken";
import config from "../api/config/config";
import JwtExpirationService from "../services/JwtExpirationService";

var atob = require("atob");

export default class JwtHelper {
  static async generateToken(payload) {
    const jwtExpiration = await JwtExpirationService.getExpirationSettings();

    const data = {
      id: payload.id,
      username: payload.username,
      email: payload.email,
      role: payload.role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 60 * jwtExpiration.default, // hour
    };
    if (payload.rememberMe) {
      console.log("remembered");
      data.exp =
        Math.floor(Date.now() / 1000) + 60 * 60 * 24 * jwtExpiration.remembered; //day
    }

    return jwt.sign(data, config.jwt.secret);
  }

  static authurize(ExpectedRoles) {
    return function (req, res, next) {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(" ")[1];

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

  static validateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];

    if (token === null) return res.sendStatus(401);

    jwt.verify(token, config.jwt.secret, (err, user) => {
      if (err) return res.sendStatus(403);
      req.user = user;
      next();
    });
  }

  static VerifyToken(accessToken) {
    const token = accessToken;

    if (token === null) return res.sendStatus(401);

    return jwt.verify(token, config.jwt.secret, (err, user) => {
      if (err) return { isValid: false, role: "" };
      return { isValid: true, role: user.role };
    });
  }

  static GetCurrentUserByToken(accessToken) {
    const token = accessToken;

    if (token === null) return res.sendStatus(401);

    return jwt.verify(token, config.jwt.secret, (err, user) => {
      if (err) return {};
      return {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      };
    });
  }
}
