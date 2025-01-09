const express = require("express");
const router = express.Router();
const LoginController = require("../controllers/loginController");

// Login routes
router.get("/", LoginController.loginUser);
router.post("/", LoginController.saveLoginUser);

// Register routes
router.get("/register", LoginController.registerForm);
router.post("/register", LoginController.saveRegister);

// Logout route
router.get("/logout", LoginController.logout);

module.exports = router;
