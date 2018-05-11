const app = require('express').Router();
const EMAILPASS = process.env.EMAILPASS
const nodemailer = require('nodemailer')
module.exports = app;

app.post('/', (req, res, next) => {
  const { email, subject, htmlForEmail } = req.body;
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
      user: 'j2awidgets@gmail.com',
      pass: EMAILPASS
    },
    tls:{
      rejectAuthorized: false
    }
  });

  let HelperOptions = {
    from: '"J²A Widgets" <j2awidgets@gmail.com>',
    to: email,
    subject: subject,
    html: htmlForEmail
  }

  transporter.sendMail(HelperOptions, (error, info) => {
    if (error) return console.log(error)
  })
  
  res.sendStatus(200);
  
});






