"use strict";
const { format } = require("date-fns");
const { v4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Templates");
    await queryInterface.bulkDelete("Users");
  },

  async down(queryInterface, Sequelize) {
    // Ignore
  },
};
