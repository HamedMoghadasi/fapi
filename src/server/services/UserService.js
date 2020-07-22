import bcrypt from "bcrypt";
import database from "../api/models";
import passwordGenerator from "generate-password";
import { stat } from "fs";
const { Op } = require("sequelize");

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

  static async IsUserExist(newUser) {
    try {
      const user = await database.User.findOne({
        where: {
          [Op.or]: {
            email: newUser.email,
            username: newUser.username,
          },
          state: { [Op.not]: state.Deleted },
        },
      }).catch((error) => {
        throw error;
      });
      return user;
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
        where: {
          [Op.and]: {
            email: email,
            state: { [Op.not]: state.Deleted },
          },
        },
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
        userToDelete.state = state.Deleted;
        const deletedUser = await database.User.update(userToDelete, {
          where: { id: Number(id) },
        });
        return deletedUser;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async changePasswordFromProfile(user, oldPassword, newPassword) {
    const currentUser = await database.User.findOne({
      where: { id: Number(user.id) },
    });
    console.log("currentUser :>> ", currentUser);
    var isMatch = bcrypt.compareSync(oldPassword, currentUser.password);

    if (isMatch) {
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
    } else {
      throw new Error("Password is not match");
    }
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

  static async forgetPassword(user) {
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
