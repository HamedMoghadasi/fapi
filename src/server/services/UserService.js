import bcrypt from "bcrypt";
import database from "../api/models";
import passwordGenerator from "generate-password";

const state = require("../constants/userStates");
class UserService {
  static async getAllUsers() {
    try {
      const users = await database.User.findAll();
      return users;
    } catch (error) {
      throw error;
    }
  }

  static async getUsersByState(targetState) {
    try {
      let users;
      if (targetState === state.Active) {
        users = await database.User.findAll({
          where: { state: state.Active },
        });
      } else if (targetState === state.Suspend) {
        users = await database.User.findAll({
          where: { state: state.Suspend },
        });
      } else if (targetState === state.Unconfirmed) {
        users = await database.User.findAll({
          where: { state: state.Unconfirmed },
        });
      }

      return users;
    } catch (error) {
      throw error;
    }
  }

  static async addUser(newUser) {
    try {
      return database.User.create(newUser).catch((error) => {
        throw error;
      });
    } catch (error) {
      throw error.detail;
    }
  }

  static async updateUser(id, updatedUser) {
    try {
      const userToUpdate = await database.User.findOne({
        where: { id: Number(id) },
      });
      if (userToUpdate) {
        await database.User.update(updatedUser, { where: { id: Number(id) } });

        return updatedUser;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getAUser(id) {
    try {
      const theUser = await database.User.findOne({
        where: { id: Number(id) },
      });

      return theUser;
    } catch (error) {
      throw error;
    }
  }

  static async getAUserByConfirmationCode(code) {
    try {
      const theUser = await database.User.findOne({
        where: { confirmationCode: code },
      });

      return theUser;
    } catch (error) {
      throw error;
    }
  }

  static async getUserByEmail(email) {
    try {
      const theUser = await database.User.findOne({
        where: { email: email },
      });

      return theUser;
    } catch (error) {
      throw error;
    }
  }

  static async deleteUser(id) {
    try {
      const userToDelete = await database.User.findOne({
        where: { id: Number(id) },
      });

      if (userToDelete) {
        const deletedUser = await database.User.destroy({
          where: { id: Number(id) },
        });
        return deletedUser;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async changePasswordFromProfile(user, newPassword) {
    return await bcrypt
      .hash(newPassword, 15)
      .then((hash) => {
        user.password = hash;
        database.User.update(user, { where: { id: Number(user.id) } });

        return user;
      })
      .catch((err) => {
        throw new Error();
      });
  }

  static async resetAUserPasswordByAdmin(user) {
    try {
      var newPassword = passwordGenerator.generate({
        length: 10,
        numbers: true,
      });
      console.log("new pasword", newPassword);
      var succesful = await bcrypt
        .hash(newPassword, 15)
        .then((hash) => {
          user.password = hash;
          database.User.update(user, { where: { id: Number(user.id) } });

          return newPassword;
        })
        .catch((err) => {
          throw new Error();
        });

      if (succesful) {
        return newPassword;
      } else {
        return null;
      }
    } catch (err) {
      throw new Error();
    }
  }
}

export default UserService;
