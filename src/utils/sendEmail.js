const nodemailer = require('nodemailer')

const sendEmail = mailOptions => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD
    }
  })

  transporter.sendMail(mailOptions, err => err && console.error(err))
}

module.exports = sendEmail
