const express = require("express");
const router = express.Router();
const HomeController = require("../controllers/homeController");
const LoginController = require("../controllers/loginController");
const loginRouter = require("./login");
const instructorRouter = require("./instructor");
const profileRouter = require("./profile");
const userRouter = require("./user");
const routerCourses = require("./courses");
const routerCategory = require("./category");

// Home route
router.get("/", HomeController.home);

// Use other routers
router.use("/login", loginRouter);
router.use("/instructor", instructorRouter);
router.use("/profile", profileRouter);
router.use("/user", userRouter);

module.exports = router;
