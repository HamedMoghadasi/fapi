import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRoutes from "./server/routes/UserRoutes";
import authRoutes from "./server/routes/AuthRouter";
import userProfileRoutes from "./server/routes/UserProfileRouter";
import userActivityLogRoutes from "./server/routes/UserActivityLogRouter";
import JwtHelper from "./server/utils/Jwt";
import cors from "cors";
import CaptchaController from "./server/controllers/CaptchaController";

var app = new express();
dotenv.config();

const corsConfig =
  process.env.NODE_ENV !== "production"
    ? {
        origin: "http://localhost:3000",
        credentials: true,
      }
    : {
        origin: "http://localhost:3000",
        credentials: true,
      };

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsConfig));

var port = process.env.PORT || 3502;

app.get("/api/v1/captcha", CaptchaController.Get);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admin/users", JwtHelper.validateToken, userRoutes);
app.use(
  "/api/v1/admin/UserActivityLogs",
  JwtHelper.validateToken,
  userActivityLogRoutes
);
app.use("/api/v1/profile/user", JwtHelper.validateToken, userProfileRoutes);

app.listen(port, () => {
  console.log(`Server is running on PORT :: ${port}`);
});

export default app;
