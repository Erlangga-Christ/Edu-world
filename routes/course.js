const express = require("express");
const router = express.Router();
const CourseController = require("../controllers/courseController");

router.get("/", CourseController.getAllCourse);

router.get("/add", CourseController.addCourse);
router.post("/add", CourseController.createCourse);

router.get("/delete/:id", CourseController.deleteCourse);

module.exports = router;
