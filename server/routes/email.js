const app = require('express').Router();
const { EMAILPASS } = require('../../secret')
module.exports = app;

const nodemailer = require('nodemailer')

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
    // text: 'Insert text', // use this for a simple single line of text
    html: htmlForEmail // or add html (as a string)
  }

  transporter.sendMail(HelperOptions, (error, info) => {
    if (error) return console.log(error)
  })
  // .then(email => res.send(email))
  // .then(() => res.sendStatus(200))
});






