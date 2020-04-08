import UserService from "../services/UserService";
import Util from "../utils/Utils";
import JwtHelper from "../utils/Jwt";
import bcrypt from "bcrypt";

import MailService from "../services/MailService";
import uuid from "uuid/v4";
import UserActivityLogService from "../services/UserActivityLogService";

const util = new Util();
const state = require("../constants/userStates");
const userActivity = require("../constants/userActivity");

class UserActivityLogController {
  static async getLogsByUserId(req, res) {
    try {
      const { id } = req.params;

      const logs = await UserActivityLogService.getLogsByUserId(id);

      if (logs.length > 0) {
        util.setSuccess(200, `user activity logs retrieved successfully`, logs);
      } else {
        util.setSuccess(200, `No log found for current user`);
      }
      return util.send(res);
    } catch (error) {
      console.error(error);
      util.setError(400, error);
      return util.send(res);
    }
  }
  static async getLogsOfSpecificUserByActivity(req, res) {
    try {
      const { activity, id } = req.params;
      let logs = await UserActivityLogService.getLogsOfSpecificUserByActivity(
        id,
        activity
      );

      if (logs.length > 0) {
        util.setSuccess(
          200,
          `user ${activity} logs retrieved successfully`,
          logs
        );
      } else {
        util.setSuccess(200, `No logs found for '${activity}' activity`);
      }
      return util.send(res);
    } catch (error) {
      console.error(error);

      util.setError(400, error);
      return util.send(res);
    }
  }

  static async getLogsByActivity(req, res) {
    try {
      const { activity } = req.params;
      let logs;

      logs = await UserActivityLogService.getLogsByActivity(activity);

      if (logs.length > 0) {
        util.setSuccess(
          200,
          `user ${activity} logs retrieved successfully`,
          logs
        );
      } else {
        util.setSuccess(200, `No logs found for '${activity}' activity`);
      }
      return util.send(res);
    } catch (error) {
      console.error(error);

      util.setError(400, error);
      return util.send(res);
    }
  }
}

export default UserActivityLogController;
