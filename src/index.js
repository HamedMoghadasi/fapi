import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import userRoutes from "./server/routes/UserRoutes";

var app = new express();
dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var port = process.env.PORT || 3501;

app.use("/api/v1/users", userRoutes);

app.listen(port, () => {
  console.log(`Server is running on PORT :: ${port}`);
});

export default app;
