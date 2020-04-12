import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const url = process.env.HOST_URL;
export default class MailService {
  static async Send(emails, subject, body) {
    console.log(emails);
    var transporter = nodemailer.createTransport({
      host: "webmail.developair.ir",
      port: 587,
      secure: false, // upgrade later with STARTTLS
      auth: {
        user: "fater@developair.ir",
        pass: "Hamed@123456",
      },
    });

    var mailOptions = {
      from: "fater@developair.ir",
      to: emails,
      subject: `${subject}`,
      html: `${body}`,
    };
    console.log(mailOptions);
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }

  static prepareResetPasswordMailBody(newPassword) {
    return `<h1>Your new Password is <span style="color:green;">${newPassword}</span></h1>`;
  }

  static prepareUserRegisterMailBody(confirmationCode) {
    var activationUrl = `${url}/api/v1/auth/confirmation/${confirmationCode}`;

    return `<h1><a href='${activationUrl}' 
    style="text-decoration: none;
    color: black;
    border: 1px solid #106d26;
    border-radius: 5px;
    padding: 10px;
    background: #28a745;"
    >فعالسازی حساب کاربری</a></h1>`;
  }
}
