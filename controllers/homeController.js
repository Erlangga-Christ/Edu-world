const { User, UserProfile, UserCouse, Category, Course } = require("../models");

class HomeController {
  static home(req, res) {
    try {
      const courses = Course.findAll();
      res.render("homePage", { courses });
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = HomeController;
