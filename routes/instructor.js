const express = require("express");
const router = express.Router();

router.get("/", InstructorController.home);

module.exports = router;
