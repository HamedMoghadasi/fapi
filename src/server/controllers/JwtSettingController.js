import Util from "../utils/Utils";
import JwtSettingService from "../services/JwtExpirationService";

const util = new Util();

class JwtSettingController {
  static async Get(req, res) {
    var response = JwtSettingService.getExpirationSettings()
      .then((response) => {
        util.setSuccess(200, "OK", response);
        util.send(res);
      })
      .catch((err) => {
        util.setError(500, "Server Error");
        util.send(res);
      });
  }

  static async add(req, res) {
    if (!req.body.default || !req.body.remembered) {
      util.setError(400, "Please provide complete details");
      return util.send(res);
    }
    const newSettings = req.body;

    try {
      const setting = await JwtSettingService.add(newSettings);

      util.setSuccess(
        201,
        `Successfull! \n A confirmation email send for you.`,
        setting
      );
      return util.send(res);
    } catch (error) {
      util.setError(400, error.errors[0].message);
      return util.send(res);
    }
  }
}

export default JwtSettingController;
