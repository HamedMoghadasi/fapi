import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRoutes from "./server/routes/UserRoutes";
import authRoutes from "./server/routes/AuthRouter";
import jwtRoutes from "./server/routes/JWTRouter";
import locationRoutes from "./server/routes/LocationRoute";
import baseMapServerRouter from "./server/routes/BaseMapServerRouter";
import heatMapServerRouter from "./server/routes/HeatMapServerRouter";
import customVectorFileRouter from "./server/routes/CustomLayerFileRouter";
import userProfileRoutes from "./server/routes/UserProfileRouter";
import userActivityLogRoutes from "./server/routes/UserActivityLogRouter";
import JwtHelper from "./server/utils/Jwt";
import cors from "cors";
import CaptchaController from "./server/controllers/CaptchaController";
import { init as initHeatMapServer } from "./server/modules/heatMapFetcher/heatMapFetcherModule";

var app = new express();
dotenv.config();
initHeatMapServer();

global.__basedir = __dirname;
const corsOptions = {
  origin: [
    process.env.CORS_ORIGIN_Localhost,
    process.env.CORS_ORIGIN_IP,
    "http://localhost:3000",
    "http://192.168.11.16:3000",
    "http://localhost:5000",
    "http://192.168.11.16:5000",
    "capacitor://localhost",
    "ionic://localhost",
    "http://localhost",
    "http://localhost:8080",
    "http://localhost:8100",
    "http://10.0.2.2",
  ],
  credentials: true,
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors(corsOptions));

var port = process.env.PORT || 3505;

app.use("/static", express.static(__dirname + "/server/assets"));
app.get("/api/v1/captcha", CaptchaController.Get);
app.use("/api/v1/Location", locationRoutes);
app.use("/api/v1/baseMapServer", baseMapServerRouter);
app.use("/api/v1/heatMapServer", heatMapServerRouter);
app.use("/api/v1/customVectorFile", customVectorFileRouter);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/jwt/expiration", JwtHelper.validateToken, jwtRoutes);
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
