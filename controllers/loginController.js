const User = require("../models/user");

class LoginController {
  static async loginUser(req, res) {
    try {
      const { error } = req.query;
      res.render("login/loginUser", { error });
    } catch (error) {
      res.send(error);
    }
  }

  static async saveLoginUser(req, res) {
    try {
      const { userName, password } = req.body;
      const isValidLogin = await User.checkLogin(userName, password);
      if (isValidLogin) {
        req.session.user = {
          id: isValidLogin.id,
          role: isValidLogin.role,
          userName: isValidLogin.userName,
        };
      }
      res.redirect("/");
    } catch (error) {
      if (error.name === "errorLogin") {
        return res.redirect("/login?error=" + error.msg);
      }
      res.send(error);
    }
  }

  static async registerForm(req, res) {
    try {
      const { error } = req.query;
      res.render("login/register", { error });
    } catch (error) {
      res.send(error);
    }
  }

  static async saveRegister(req, res) {
    try {
      const { userName, password, email, role } = req.body;
      await User.create({ userName, password, email, role });
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
      req.session.destroy((err) => {
        if (err) {
          return res.status(500).send("Internal server error");
        }
        res.redirect("/login");
      });
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = LoginController;
