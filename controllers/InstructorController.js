const { User, UserProfile, UserCouse, Category, Course } = require("../models");

class InstructorController {
  static async home(req, res) {
    try {
      const courses = await Course.findAll({
        include: Category,
      });

      res.render("instructorHome", { courses });
    } catch (error) {
      res.send(error);
    }
  }

  static async addCourseForm(req, res) {
    try {
      const categories = await Category.findAll();
      res.render("addCourseByInstructor", { categories });
    } catch (error) {
      res.send(error);
    }
  }

  static async createCourse(req, res) {
    try {
      const { title, price, duration, categoryId } = req.body;
      await Course.create({ title, price, duration, categoryId });
      res.redirect("/instructor");
    } catch (error) {
      res.send(error);
    }
  }

  static async editCourseForm(req, res) {
    try {
      const { id } = req.params;
      const course = await Course.findByPk(id, {
        include: Category,
      });
      const categories = await Category.findAll();
      res.render("editCourseByInstructor", { course, categories });
    } catch (error) {
      res.send(error);
    }
  }

  static async updateCourse(req, res) {
    try {
      const { id } = req.params;
      const { title, price, duration, categoryId } = req.body;
      await Course.update(
        { title, price, duration, categoryId },
        { where: { id } }
      );
      res.redirect("/instructor");
    } catch (error) {
      res.send(error);
    }
  }

  static async deleteCourse(req, res) {
    try {
      const { id } = req.params;
      await Course.destroy({ where: { id } });
      res.redirect("/instructor");
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = InstructorController;
