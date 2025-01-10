const { where } = require("sequelize");
const { UserCourse, Course } = require("../models");

class CourseController {
  static async getAllCourse(req, res) {
    try {
      const userSession = global.session;
      const courses = await UserCourse.findAll({
        include: [{ model: Course, include: ["Category"] }],
        where: {
          UserId: userSession.id,
        },
      });
      // console.log("courses: ", courses);

      //   res.send(courses);
      res.render("course", { courses });
    } catch (error) {
      console.log(error.message);
      res.send(error);
    }
  }
  // static async getAllCourse(req, res) {
  //   try {
  //     const { search } = req.query;
  //     const options = {
  //       include: Category,
  //       where: {},
  //     };
  //     if (search) {
  //       options.where.title = {
  //         [Op.iLike]: `%${search}%`,
  //       };
  //     }
  //     const courses = await Course.findAll(options);
  //     await res.render("course", { courses });
  //   } catch (error) {
  //     console.log();

  //     res.send(error);
  //   }
  // }

  static async deleteCourse(req, res) {
    try {
      const { id } = req.params;
      const userSession = global.session;

      await UserCourse.destroy({
        where: {
          UserId: userSession.id,
          CourseId: id,
        },
      });

      res.redirect("/course");
    } catch (error) {
      res.send(error);
    }
  }

  static async addCourse(req, res) {
    try {
      const courses = await Course.findAll();
      // res.send(courses);
      res.render("addCourse", { courses });
    } catch (error) {
      res.send(error);
    }
  }

  static async createCourse(req, res) {
    try {
      const { courseId } = req.body;
      if (!courseId) {
        return res
          .status(400)
          .redirect("/course/add?error=Course ID is required");
      }

      const course = await Course.findByPk(courseId);
      const userSession = global.session;

      if (course) {
        await UserCourse.create({
          UserId: userSession.id,
          CourseId: course.id,
        });
        res.redirect("/course");
      } else {
        res.redirect("/course/add?error=Course not found");
      }
    } catch (error) {
      console.error(error);
      res.status(500).send("Failed to create course.");
    }
  }
}

module.exports = CourseController;
