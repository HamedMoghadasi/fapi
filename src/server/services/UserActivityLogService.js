import database from "../api/models";

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
}

export default UserActivityLogService;
