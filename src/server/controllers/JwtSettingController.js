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
}

export default JwtSettingController;
