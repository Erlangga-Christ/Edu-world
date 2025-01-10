const User = require("../models/user");

class UserController {
  static async home(req, res) {
    try {
      const users = await User.findAll();

      res.send(users);
      res.render("login", { users });
    } catch (error) {
      console.log(error.mesaage);
      res.send(error);
    }
  }
}

module.exports = UserController;
