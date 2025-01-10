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
      // User.hasOne(models.Profile, {
      //   foreignKey: "UserId",
      // });
      // User.hasMany(models.Course, {
      //   foreignKey: "UserId",
      // });
      // User.hasMany(models.Instructor, {
      //   foreignKey: "InstructorId",
      // });
    }

    static async checkLogin(username, password) {
      const getUser = await User.findOne({
        where: {
          username,
        },
      });
      // console.log(getUser);
      let getErrors = {
        name: "errorLogin",
        msg: [],
      };
      if (!getUser) {
        getErrors.msg.push("Username or password invalid");
      } else {
        const isPasswordValid = await bcrypt.compare(
          password,
          getUser.password
        );
        if (!isPasswordValid) {
          getErrors.msg.push("Username or password invalid");
        }
      }

      if (getErrors.msg.length > 0) {
        throw getErrors;
      }

      return getUser;
    }
  }

  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Username tidak boleh kosong",
          },
          notNull: {
            msg: "Username tidak boleh kosong",
          },
          async cekUsername(value) {
            if (value.length < 5) {
              throw new Error("Username minimum 5 karakter");
            }
            const existingUser = await User.findOne({
              where: { username: value },
            });
            if (existingUser) {
              throw new Error(
                "Username sudah ada tolong pakai username yang lain"
              );
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Email tidak boleh kosong",
          },
          notNull: {
            msg: "Email tidak boleh kosong",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Password tidak boleh kosong",
          },
          notNull: {
            msg: "Password tidak boleh kosong",
          },
        },
        cekPassword(value) {
          if (value.length < 8) {
            throw new Error("Password minimum 8 karakter");
          }
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
    }
  );

  User.beforeCreate(async (instance) => {
    const saltRounds = 8;
    const myPlaintextPassword = instance.password;

    const hash = await bcrypt.hash(myPlaintextPassword, saltRounds);
    instance.password = hash;
  });

  return User;
};
