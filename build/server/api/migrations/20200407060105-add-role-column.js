"use strict";

var roles = require("../../constants/roles");

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.addColumn("Users", "Role", {
      type: Sequelize.STRING,
      defaultValue: roles.User,
      allowNull: false
    });
  },
  down: function down(queryInterface, Sequelize) {}
};