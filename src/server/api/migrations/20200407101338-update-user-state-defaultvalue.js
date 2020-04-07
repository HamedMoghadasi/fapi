"use strict";
var states = require("../../constants/userStates");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn("Users", "state", {
      type: Sequelize.STRING,
      defaultValue: states.Unconfirmed,
    });
  },

  down: (queryInterface, Sequelize) => {},
};
