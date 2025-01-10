const { User, UserProfile, UserCouse, Category, Course } = require("../models");

class HomeController {
  static async home(req, res) {
    try {
      await res.render("homePage");
    } catch (error) {
      console.log(error);

      res.send(error);
    }
  }
}

module.exports = HomeController;
