import database from "../api/models";

const userActivity = require("../constants/userActivity");
class UserActivityLogService {
  static async Log(action, userId) {
    try {
      const newLog = {
        action: action,
        userId: userId,
      };

      return database.UserActivityLog.create(newLog).catch((error) => {
        console.error(error);
        throw error;
      });
    } catch (error) {
      console.log(error);

      throw error.detail;
    }
  }
  static async getLogsOfSpecificUserByActivity(id, activity) {
    try {
      let logs;
      if (activity === userActivity.Login) {
        logs = await database.UserActivityLog.findAll({
          where: { action: userActivity.Login, userId: id },
        });
      } else if (activity === userActivity.Logout) {
        logs = await database.UserActivityLog.findAll({
          where: { action: userActivity.Logout, userId: id },
        });
      }

      return logs;
    } catch (error) {
      throw error;
    }
  }
  static async getLogsByUserId(id) {
    try {
      let logs = await database.UserActivityLog.findAll({
        where: { userId: id },
      });

      return logs;
    } catch (error) {
      throw error;
    }
  }
  static async getAll() {
    try {
      let logs = await database.UserActivityLog.findAll({});

      return logs;
    } catch (error) {
      throw error;
    }
  }
  static async getLogsByActivity(activity) {
    try {
      let logs;
      if (activity === userActivity.Login) {
        logs = await database.UserActivityLog.findAll({
          where: { action: userActivity.Login },
        });
      } else if (activity === userActivity.Logout) {
        logs = await database.UserActivityLog.findAll({
          where: { action: userActivity.Logout },
        });
      }

      return logs;
    } catch (error) {
      throw error;
    }
  }
}

export default UserActivityLogService;
