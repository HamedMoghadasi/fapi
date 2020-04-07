const roles = require("../../constants/roles");
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn("Users", "Role", {
      type: Sequelize.STRING,
      defaultValue: roles.User,
      allowNull: false,
    });
  },

  down: (queryInterface, Sequelize) => {},
};
