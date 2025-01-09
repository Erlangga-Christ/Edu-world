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
    const userProfiles = JSON.parse(
      fs.readFileSync("./data/userProfile.json", "utf-8")
    ).map((userProfile) => {
      delete userProfile.id;
      return {
        ...userProfile,
      };
    });
    await queryInterface.bulkInsert("UserProfiles", userProfiles, {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("UserProfiles", null, {});
  },
};
