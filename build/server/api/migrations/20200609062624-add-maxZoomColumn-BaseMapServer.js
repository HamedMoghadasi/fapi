"use strict";

module.exports = {
  up: function up(queryInterface, Sequelize) {
    return queryInterface.addColumn("BaseMapServers", "maxZoom", {
      type: Sequelize.STRING,
      allowNull: false
    });
  },
  down: function down(queryInterface, Sequelize) {}
};