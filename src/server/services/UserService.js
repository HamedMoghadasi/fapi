import database from "../api/models";
import bcrypt from "bcrypt";

class UserService {
  static async getAllUsers() {
    try {
      const users = await database.User.findAll();
      return users;
    } catch (error) {
      throw error;
    }
  }

  static async addUser(newUser) {
    try {
      let result;
      bcrypt.hash(newUser.password, 15, (err, hash) => {
        const user = {
          ...newUser,
          password: hash
        };
        result = database.User.create(user);
      });

      return result;
    } catch (error) {
      throw error;
    }
  }

  static async updateUser(id, updateUser) {
    try {
      const userToUpdate = await database.User.findOne({
        where: { id: Number(id) }
      });

      if (userToUpdate) {
        await database.User.update(updateUser, { where: { id: Number(id) } });

        return updateUser;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }

  static async getAUser(id) {
    try {
      const theUser = await database.User.findOne({
        where: { id: Number(id) }
      });

      return theUser;
    } catch (error) {
      throw error;
    }
  }

  static async getUserByEmail(email) {
    try {
      const theUser = await database.User.findOne({
        where: { email: email }
      });

      return theUser;
    } catch (error) {
      throw error;
    }
  }

  static async deleteUser(id) {
    try {
      const userToDelete = await database.User.findOne({
        where: { id: Number(id) }
      });

      if (userToDelete) {
        const deletedUser = await database.User.destroy({
          where: { id: Number(id) }
        });
        return deletedUser;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default UserService;
