import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRoutes from "./server/routes/UserRoutes";
import authRoutes from "./server/routes/AuthRouter";
import userProfileRoutes from "./server/routes/UserProfileRouter";
import userActivityLogRoutes from "./server/routes/UserActivityLogRouter";
import JwtHelper from "./server/utils/Jwt";
import cors from "cors";
import cookieParser from "cookie-parser";

var app = new express();
dotenv.config();

const corsConfig =
  process.env.NODE_ENV !== "production"
    ? {
        origin: "http://localhost:3000",
        credentials: true,
      }
    : {
        origin: "https://our-website.com",
        credentials: true,
      };

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsConfig));
app.use(cookieParser());

var port = process.env.PORT || 3502;

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

app.get("/cookies", function (req, res) {
  res.cookie("name", "express").send("cookie set");
  console.log(req.cookies);
});

export default app;
