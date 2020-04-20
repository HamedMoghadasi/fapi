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
        console.log("b1", jsonResponse);

        return {
          default: jsonResponse.default,
          remembered: jsonResponse.remembered,
        };
      });
    } catch (error) {
      throw error;
    }
  }
}

export default JwtExpirationService;
