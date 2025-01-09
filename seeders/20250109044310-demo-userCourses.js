"use strict";

const fs = require("fs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    const userCourses = JSON.parse(
      fs.readFileSync("./data/userCourse.json", "utf-8")
    ).map((userCourse) => {
      delete userCourse.id;
      return {
        ...userCourse,
      };
    });
    await queryInterface.bulkInsert("UserCourses", userCourses, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("UserCourses", null, {});
  },
};
