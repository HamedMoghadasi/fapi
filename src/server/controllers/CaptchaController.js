import svgCaptcha from "svg-captcha";
import bcryptjs from "bcryptjs";
import Util from "../utils/Utils";

const util = new Util();

class CaptchaController {
  static async Get(req, res) {
    try {
      var captcha = svgCaptcha.create();

      await bcryptjs
        .hash(captcha.text, 5)
        .then((hash) => {
          captcha.text = hash;
          console.log(`${hash}hM73`.length);
          util.setSuccess(200, "Succefull!", {
            captcha: { token: captcha.text, svg: captcha.data },
          });
          return util.send(res);
        })
        .catch((err) => {
          util.setError(400, "An error occured on CAPTCHA service.", {
            code: 5001,
          });
          return util.send(res);
        });
    } catch (error) {
      util.setError(400, "An error occured on CAPTCHA service.", {
        code: 5002,
      });
      return util.send(res);
    }
  }
}

export default CaptchaController;
