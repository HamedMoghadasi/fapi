"use strict";

var states = require("../../constants/userStates");

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.addColumn("Users", "state", {
      type: Sequelize.STRING,
      defaultValue: states.Active,
      allowNull: false
    });
  },
  down: function down(queryInterface, Sequelize) {}
};