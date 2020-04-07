import nodemailer from "nodemailer";

export default class MailService {
  static async Send(email, confirmationCode, origin) {
    var transporter = nodemailer.createTransport({
      host: "webmail.developair.ir",
      port: 587,
      secure: false, // upgrade later with STARTTLS
      auth: {
        user: "fater@developair.ir",
        pass: "Hamed@123456",
      },
    });

    var activationUrl = `${origin}/api/v1/auth/confirmation/${confirmationCode}`;
    var body = `<h1><a href='${activationUrl}' 
    style="text-decoration: none;
    color: black;
    border: 1px solid #106d26;
    border-radius: 5px;
    padding: 10px;
    background: #28a745;"
    >فعالسازی حساب کاربری</a></h1>`;

    var mailOptions = {
      from: "fater@developair.ir",
      to: [email, "h4lmed@gmail.com"],
      subject: "Fater GIS Registration",
      html: `${body}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  }
}
