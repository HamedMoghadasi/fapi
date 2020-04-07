import UserService from "../services/UserService";
import Util from "../utils/Utils";
import JwtHelper from "../utils/Jwt";
import bcrypt from "bcrypt";

import MailService from "../services/MailService";
import uuid from "uuid/v4";

const util = new Util();

class UserController {
  static async login(req, res) {
    if (!req.body.email || !req.body.password) {
      util.setError(400, "Please provide complete details");
      return util.send(res);
    }
    try {
      const theUser = await UserService.getUserByEmail(req.body.email);
      if (theUser) {
        if (theUser.isEmailConfirmed) {
          console.log(theUser.role);

          bcrypt.compare(
            req.body.password,
            theUser.password,
            (error, result) => {
              if (result) {
                util.setSuccess(200, "Successfully logined.", {
                  token: JwtHelper.generateToken(theUser),
                });
                return util.send(res);
              } else {
                util.setError(400, "Password is wrong");
                return util.send(res);
              }
            }
          );
        } else {
          util.setError(400, "User is not activated");
          return util.send(res);
        }
      } else {
        util.setError(400, "There's not exist such a user with this email");
        return util.send(res);
      }
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async getAllUsers(req, res) {
    try {
      const allUsers = await UserService.getAllUsers();
      if (allUsers.length > 0) {
        util.setSuccess(200, "Users retrieved", allUsers);
      } else {
        util.setSuccess(200, "No user found");
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async addUser(req, res) {
    if (!req.body.email || !req.body.username || !req.body.password) {
      util.setError(400, "Please provide complete details");
      return util.send(res);
    }
    const newUser = req.body;

    try {
      const createdUser = await UserService.addUser(newUser);

      var url = `${req.protocol}://${req.headers.host}`;
      MailService.Send(createdUser.email, createdUser.confirmationCode, url);

      util.setSuccess(201, "User Added!", createdUser);
      return util.send(res);
    } catch (error) {
      util.setError(400, error.errors[0].message);
      return util.send(res);
    }
  }

  static async confirmUser(req, res) {
    const { code } = req.params;
    console.log(code);
    if (code.length < 0) {
      util.setError(400, "confirmation code is not valid");
      return util.send(res);
    }
    try {
      const targetUser = await UserService.getAUserByConfirmationCode(code);
      if (!targetUser) {
        util.setError(404, `confirmation code is not valid`);
      } else {
        targetUser.confirmationCode = uuid();
        targetUser.isEmailConfirmed = true;
        const updateUser = await UserService.updateUser(
          targetUser.id,
          targetUser
        );
        if (!updateUser) {
          util.setError(404, `Cannot find user with the id: ${id}`);
        } else {
          util.setSuccess(200, "User Activated!", {
            isEmailConfirmed: updateUser.isEmailConfirmed,
          });
        }
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async updatedUser(req, res) {
    const alteredUser = req.body;
    const { id } = req.params;
    if (!Number(id)) {
      util.setError(400, "Please input a valid numeric value");
      return util.send(res);
    }
    try {
      const updateUser = await UserService.updateUser(id, alteredUser);
      if (!updateUser) {
        util.setError(404, `Cannot find user with the id: ${id}`);
      } else {
        util.setSuccess(200, "User updated", updateUser);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async getAUser(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, "Please input a valid numeric value");
      return util.send(res);
    }

    try {
      const theUser = await UserService.getAUser(id);

      if (!theUser) {
        util.setError(404, `Cannot find user with the id ${id}`);
      } else {
        util.setSuccess(200, "Found User", theUser);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async deleteUser(req, res) {
    const { id } = req.params;

    if (!Number(id)) {
      util.setError(400, "Please provide a numeric value");
      return util.send(res);
    }

    try {
      const userToDelete = await UserService.deleteUser(id);

      if (userToDelete) {
        util.setSuccess(200, "User deleted");
      } else {
        util.setError(404, `User with the id ${id} cannot be found`);
      }
      return util.send(res);
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }
}

export default UserController;
