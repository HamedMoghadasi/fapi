"use strict";

const states = require("../../constants/userStates");

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Users", "state", {
      type: Sequelize.STRING,
      defaultValue: states.Active,
      allowNull: false,
    });
  },

  down: (queryInterface, Sequelize) => {},
};
