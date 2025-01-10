const express = require("express");
const router = express.Router();
const HomeController = require("../controllers/homeController");
const loginRouter = require("./login");
const coursesRouter = require("./course");
const instructorRouter = require("./instructor");
// const userRouter = require("./user");
// const profileRouter = require("./profile");
// const routerCategory = require("./category");

// Home route
router.get("/", HomeController.home);

// Use other routers
router.use("/login", loginRouter);
router.use("/course", coursesRouter);
router.use("/instructor", instructorRouter);
// router.use("/user", userRouter);
// router.use("/profile", profileRouter);

module.exports = router;
