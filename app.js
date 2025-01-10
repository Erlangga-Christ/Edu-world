"use strict";

const express = require("express");
const app = express();
const router = require("./routes/index");
const port = 3000;
const session = require("express-session");
const User = require("./models/user");
const { sequelize } = require("./models");
const login = require("./routes/login");

global.session = {};
const WhHITELIST = ["/login", "/login/register"];

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  if (!global.session.id && !WhHITELIST.includes(req.path)) {
    res.render("login");
  } else {
    next();
  }
});

// app.use(
//   session({
//     secret: "rahasia_ya", // Ganti dengan kunci rahasia Anda
//     resave: false,
//     saveUninitialized: true,
//     cookie: { secure: false }, // Set ke true jika menggunakan HTTPS
//   })
// );

app.use(router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
// const DB = sequelize.sync();
// if (DB) {
//   console.log("Database connected");
// }
