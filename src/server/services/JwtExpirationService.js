import database from "../api/models";

class JwtExpirationService {
  static async getExpirationSettings() {
    var data = database.JWTExpirationSetting.findAll({
      limit: 1,
      order: [["createdAt", "DESC"]],
      attributes: [`id`, `default`, `remembered`],
      raw: true,
    });

    console.log("data", data);
    try {
      return database.JWTExpirationSetting.findAll({
        limit: 1,
        order: [["createdAt", "DESC"]],
        raw: true,
      }).then((response) => {
        if (!response.length) {
          let result = {
            default: "0.5",
            remembered: "7",
          };
          return result;
        }

        const jsonResponse = response[0];

        return {
          default: jsonResponse.default,
          remembered: jsonResponse.remembered,
        };
      });
    } catch (error) {
      throw error;
    }
  }
  static async add(newSetting) {
    try {
      return database.JWTExpirationSetting.create(newSetting).catch((error) => {
        throw error;
      });
    } catch (error) {
      throw error.detail;
    }
  }
}

export default JwtExpirationService;
