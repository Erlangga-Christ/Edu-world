const { User, UserProfile } = require("../models/index.js");
class LoginController {
  // static async getUser(req, res) {
  //   try {
  //     const users = await User.findAll();
  //     // console.log(users);
  //     res.send(users);
  //   } catch (error) {
  //     res.send(error);
  //   }
  // }

  static async loginUser(req, res) {
    try {
      const { error } = req.query;
      res.render("login", { error });
    } catch (error) {
      res.send(error);
    }
  }

  static async saveLoginUser(req, res) {
    try {
      const { username, password } = req.body;
      // console.log(username, password);

      const isValidLogin = await User.checkLogin(username, password);

      if (isValidLogin) {
        req.body = {
          id: isValidLogin.id,
          role: isValidLogin.role,
          username: isValidLogin.username,
        };
      }

      global.session = req.body;
      // res.render("homePage");
      if (!isValidLogin.role) {
        res.redirect("/");
      } else if (isValidLogin.role === "student") {
        res.redirect("/course");
      } else if (isValidLogin.role === "instructor") {
        res.redirect("/instructor");
      } else {
        res.redirect("/");
      }
    } catch (error) {
      console.log(error);

      if (error.name === "errorLogin") {
        return res.redirect("/login?error=" + error.msg);
      }
      res.send(error);
    }
  }

  static async registerForm(req, res) {
    try {
      const { error } = req.query;

      res.render("register", { error });
    } catch (error) {
      res.send(error);
    }
  }

  static async saveRegister(req, res) {
    try {
      const {
        username,
        password,
        email,
        role,
        bio,
        discordName,
        gender,
        age,
        lastEducation,
      } = req.body;

      console.log(req.body);

      const result = await User.create({ username, password, email, role });

      await UserProfile.create({
        bio,
        discordName,
        gender,
        age,
        lastEducation,
        UserId: result.id,
      });

      res.redirect("/login");
    } catch (error) {
      if (error.name === "SequelizeValidationError") {
        const err = error.errors.map((el) => {
          return el.message;
        });
        return res.redirect("/login/register?error=" + err.join(", "));
      }
      res.send(error);
    }
  }

  static async logout(req, res) {
    try {
      global.session = {};
      res.redirect("/login");
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = LoginController;
