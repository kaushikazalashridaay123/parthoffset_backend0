const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  try {
    if (!options.email) {
      throw new Error("Email not found");
    }
    const transporter = nodemailer.createTransport({
      host: "smtp.outlook.com",
      port: 587,
      secure: false, // Use TLS
      auth: {
        user: process.env.SMPT_MAIL,
        pass: process.env.SMPT_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.SMPT_MAIL,
      to: options.email,
      subject: options.subject,
      html: options.html,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully.");
  } catch (error) {
    console.log("Error in sendEmail:", error);
    throw error;
  }
};

module.exports = sendEmail;
