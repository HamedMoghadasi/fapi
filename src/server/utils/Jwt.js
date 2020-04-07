import * as jwt from "jsonwebtoken";
import config from "../api/config/config";

var atob = require("atob");

export default class JwtHelper {
  static generateToken(payload) {
    const data = {
      id: payload.id,
      username: payload.username,
      email: payload.email,
      role: payload.role,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 60 * 30000000,
    };

    return jwt.sign(data, config.jwt.secret);
  }

  static authurize(ExpectedRole) {
    return function (req, res, next) {
      const authHeader = req.headers.authorization;
      const token = authHeader && authHeader.split(" ")[1];

      var base64Url = token.split(".")[1];
      var base64 = base64Url.replace("-", "+").replace("_", "/");
      var payload = JSON.parse(atob(base64));
      var isAuthurized = payload.role === ExpectedRole;
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
}
