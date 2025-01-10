const express = require("express");
const router = express.Router();
const UserController = require("../controllers/userController");

router.get("/", UserController.home);

module.exports = router;
