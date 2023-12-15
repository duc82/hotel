const express = require("express");
const db = require("./models");
require("dotenv").config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static("public"));
app.use((_req, res, next) => {
  res.set({
    "Access-Control-Allow-Origin": process.env.ORIGIN_CLIENT,
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET, POST, PUT, PATCH, DELETE",
  });
  next();
});
app.use(require("./middlewares/errorHandlingMiddleware"));

app.use(require("./routes/index"));

const port = process.env.PORT || 5000;
app.listen(port, async () => {
  try {
    await db.sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
  console.log(`Server is running on port: ${port}`);
});
