import UserService from "../services/UserService";
import Util from "../utils/Utils";
import JwtHelper from "../utils/Jwt";
import bcrypt from "bcrypt";
import MailService from "../services/MailService";
import uuid from "uuid/v4";
import UserActivityLogService from "../services/UserActivityLogService";
import dotenv from "dotenv";

dotenv.config();

const util = new Util();
const state = require("../constants/userStates");
const userActivity = require("../constants/userActivity");

class UserController {
  static async logout(req, res) {
    try {
      const id = req.user.id;
      if (Number(id)) {
        await UserActivityLogService.Log(userActivity.Logout, id);

        util.setSuccess(200, "Successfully Logouted.");
        return util.send(res);
      } else {
        util.setError(400, "This user was not logined.");
        return util.send(res);
      }
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async login(req, res) {
    if (
      !req.body.email ||
      !req.body.password ||
      !req.body.rememberMe ||
      !req.body.captcha
    ) {
      util.setError(400, "Please provide complete details", {
        code: 4001,
        body: req.body,
      });
      return util.send(res);
    } else if (
      req.body.captcha.indexOf(process.env.CAPTCHA_SECRET) === -1 ||
      req.body.captcha.length !== 64
    ) {
      util.setError(400, "Captcha is not valid", { code: 4001 });
      return util.send(res);
    }
    try {
      const theUser = await UserService.getUserByEmail(req.body.email);
      theUser.rememberMe = req.body.rememberMe === "true";
      if (theUser) {
        await UserActivityLogService.Log(userActivity.Login, theUser.id);
        if (theUser.isEmailConfirmed) {
          if (
            theUser.state === state.Suspend ||
            theUser.state === state.Unconfirmed
          ) {
            util.setError(403, "Your account is not active.", { code: 4031 });
            return util.send(res);
          }

          bcrypt.compare(
            req.body.password,
            theUser.password,
            (error, result) => {
              if (result) {
                JwtHelper.generateToken(theUser).then((token) => {
                  util.setSuccess(200, "Successfully logined.", {
                    token: token,
                  });

                  return util.send(res);
                });
              } else {
                util.setError(400, "Password is wrong", { code: 4002 });
                return util.send(res);
              }
            }
          );
        } else {
          util.setError(
            400,
            "User is not activated.Please confirm your email or contact your administration."
          );
          return util.send(res);
        }
      } else {
        util.setError(400, "There's not exist such a user with this email", {
          code: 4003,
        });
        return util.send(res);
      }
    } catch (error) {
      util.setError(400, error);
      return util.send(res);
    }
  }

  static async getUsersByState(req, res) {
    try {
      var { targetState } = req.params;
      if (
        targetState === state.Active ||
        targetState === state.Suspend ||
        targetState === state.Unconfirmed
      ) {
        const users = await UserService.getUsersByState(targetState);
        if (users.length > 0) {
          util.setSuccess(200, `${targetState} users retrieved`, users);
        } else {
          util.setSuccess(200, `No user found with this state:${targetState}`);
        }
        return util.send(res);
      } else {
        util.setError(400, "Passed state is not valid.");
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

      var body = MailService.prepareUserRegisterMailBody(
        createdUser.confirmationCode
      );
      MailService.Send(
        [createdUser.email, "h4lmed@gmail.com"],
        "Fater GIS Registeration",
        body
      );

      util.setSuccess(
        201,
        `Successfull! \n A confirmation email send for you.`,
        createdUser
      );
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
        targetUser.state = state.Active;
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

  static async updateUser(req, res) {
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

  static async getUserAccount(req, res) {
    const id = req.user.id;

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

  static async updateUserAccount(req, res) {
    const id = req.user.id;
    const alteredUser = req.body;

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

  static async deleteUserAccount(req, res) {
    const id = req.user.id;

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

  static async changeState(req, res) {
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
        util.setSuccess(200, "User state updated", req.body);
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async changePasswordFromProfile(req, res) {
    const user = req.user;
    const newPassword = req.body.newPassword;
    if (!Number(user.id)) {
      util.setError(400, "User not found");
      return util.send(res);
    } else if (newPassword.length < 0 || newPassword === undefined) {
      util.setError(400, "Invalid input for new password.");
      return util.send(res);
    }
    try {
      const updateUserPassword = await UserService.changePasswordFromProfile(
        user,
        newPassword
      );

      if (!updateUserPassword) {
        util.setError(500, `Opration Failed.`);
      } else {
        util.setSuccess(200, "Successfull, You Password changed.");
      }
      return util.send(res);
    } catch (error) {
      util.setError(404, error);
      return util.send(res);
    }
  }

  static async forgetPassword(req, res) {
    const email = req.body.email;
    var targetedUser = await UserService.getUserByEmail(email);
    if (targetedUser) {
      try {
        const newPassword = await UserService.forgetPassword(targetedUser);

        if (!newPassword) {
          util.setError(500, `Opration Failed. Please try again.`);
        } else {
          const body = MailService.prepareResetPasswordMailBody(newPassword);
          console.log(body);
          MailService.Send(
            [targetedUser.email],
            "Fater GIS Reset Password",
            body
          );
          util.setSuccess(
            200,
            "Successfull, A message send to your email address, check it out."
          );
        }
        return util.send(res);
      } catch (error) {
        util.setError(404, error);
        return util.send(res);
      }
    } else {
      util.setError(400, "User not found");
      return util.send(res);
    }
  }

  static async resetAUserPasswordByAdmin(req, res) {
    const userId = req.body.userId;
    if (!Number(userId)) {
      util.setError(400, "Bad request");
      return util.send(res);
    } else {
      var targetedUser = await UserService.getAUser(userId);
      if (targetedUser) {
        try {
          const newPassword = await UserService.resetAUserPasswordByAdmin(
            targetedUser
          );

          if (!newPassword) {
            util.setError(500, `Opration Failed. Please try again.`);
          } else {
            const body = MailService.prepareResetPasswordMailBody(newPassword);
            console.log(body);
            MailService.Send(
              [targetedUser.email],
              "Fater GIS Reset Password",
              body
            );
            util.setSuccess(
              200,
              "Successfull, A message send to your email address, check it out.",
              newPassword
            );
          }
          return util.send(res);
        } catch (error) {
          util.setError(404, error);
          return util.send(res);
        }
      } else {
        util.setError(400, "User not found");
        return util.send(res);
      }
    }
  }

  static verifyUser(req, res) {
    try {
      const token = req.body.token;

      if (!token) {
        util.setError(403, "Token is not valid");
        return util.send(res);
      } else {
        const result = JwtHelper.VerifyToken(token);
        if (result.isValid) {
          util.setSuccess(200, "Verified !", result);
        } else {
          util.setError(403, "Access Denied");
        }
      }

      util.send(res);
    } catch (error) {
      util.setError(403, "Access Denied");
      return util.send(res);
    }
  }

  static getAuthenticatedUser(req, res) {
    try {
      const token = req.body.token;

      if (!token) {
        util.setError(403, "Token is not valid");
        return util.send(res);
      } else {
        const result = JwtHelper.GetCurrentUserByToken(token);
        if (Object.keys(result).length > 0) {
          util.setSuccess(200, "Verified !", result);
        } else {
          util.setError(403, "Access Denied");
        }
      }

      util.send(res);
    } catch (error) {
      util.setError(403, "Access Denied");
      return util.send(res);
    }
  }
}

export default UserController;
