"use strict";

var states = require("../../constants/userStates");

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.changeColumn("Users", "state", {
      type: Sequelize.STRING,
      defaultValue: states.Unconfirmed
    });
  },
  down: function down(queryInterface, Sequelize) {}
};