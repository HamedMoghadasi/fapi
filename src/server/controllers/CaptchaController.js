import svgCaptcha from "svg-captcha";
import bcryptjs from "bcryptjs";
import Util from "../utils/Utils";

const util = new Util();

class CaptchaController {
  static async Get(req, res) {
    try {
      var captcha = svgCaptcha.create({
        ignoreChars: "0o1ilQWERTYUIOPASDFGHJKLZXCVBNM",
        noise: 5,
      });

      await bcryptjs
        .hash(captcha.text, 5)
        .then((hash) => {
          captcha.text = hash;
          util.setSuccess(200, "Succefull!", {
            captcha: {
              token: captcha.text,
              svg: captcha.data,
              origin: req.get("origin"),
            },
          });
          return util.send(res);
        })
        .catch((err) => {
          util.setError(400, "An error occured on CAPTCHA service.", {
            code: 5001,
            origin: req.get("origin"),
          });
          return util.send(res);
        });
    } catch (error) {
      util.setError(400, "An error occured on CAPTCHA service.", {
        code: 5002,
        origin: req.get("origin"),
      });
      return util.send(res);
    }
  }
}

export default CaptchaController;
