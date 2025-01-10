const express = require("express");
const router = express.Router();
const InstructorController = require("../controllers/InstructorController");

router.get("/", InstructorController.home);

router.get("/add", InstructorController.addCourseForm);
router.post("/add", InstructorController.createCourse);

router.get("/edit/:id", InstructorController.editCourseForm);
router.post("/edit/:id", InstructorController.updateCourse);

router.get("/instructor/delete/:id", InstructorController.deleteCourse);

module.exports = router;
