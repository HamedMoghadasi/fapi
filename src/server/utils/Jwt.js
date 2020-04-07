import * as jwt from "jsonwebtoken";
import config from "../api/config/config";

export default class JwtHelper {
  static generateToken(payload) {
    const data = {
      id: payload.id,
      username: payload.username,
      email: payload.email,
      iat: config.jwt.iat,
      exp: config.jwt.exp,
    };

    return jwt.sign(data, config.jwt.secret);
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
