"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class UserCourse extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      UserCourse.belongsTo(models.User, {
        foreignKey: "UserId",
      });
      UserCourse.belongsTo(models.Course, {
        foreignKey: "CourseId",
      });
      UserCourse.belongsTo(models.User, {
        foreignKey: "InstructorId",
      });
    }
  }

  UserCourse.init(
    {
      UserId: DataTypes.INTEGER,
      CourseId: DataTypes.INTEGER,
      InstructorId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "UserCourse",
    }
  );
  return UserCourse;
};
