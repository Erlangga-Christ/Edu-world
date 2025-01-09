"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Profile, {
        foreignKey: "UserId",
      });
      User.hasMany(models.Course, {
        foreignKey: "UserId",
      });
      User.hasMany(models.Instructor, {
        foreignKey: "InstructorId",
      });
    }

    static async checkLogin(userName, password) {
      const user = await User.findOne({ where: { userName } });
      if (!user) {
        throw { name: "errorLogin", msg: "Invalid username or password" };
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw { name: "errorLogin", msg: "Invalid username or password" };
      }
      return user;
    }
  }

  User.init(
    {
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Username already exists",
        },
        validate: {
          notEmpty: {
            msg: "Username is required",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password is required",
          },
          len: {
            args: [6, 100],
            msg: "Password should be at least 6 characters long",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: "Email already exists",
        },
        validate: {
          isEmail: {
            msg: "Must be a valid email address",
          },
          notEmpty: {
            msg: "Email is required",
          },
        },
      },
      role: {
        type: DataTypes.ENUM("student", "instructor"),
        allowNull: false,
        validate: {
          isIn: {
            args: [["student", "instructor"]],
            msg: "Role must be either student or instructor",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: async (user) => {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        },
      },
    }
  );

  return User;
};
