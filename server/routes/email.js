const app = require('express').Router();
module.exports = app;

const nodemailer = require('nodemailer')

app.post('/', (req, res, next) => {
  const { email, htmlForEmail, orderId } = req.body.info;
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
      user: 'j2awidgets@gmail.com',
      pass: 'J2AallTHEway'
    },
    tls:{
      rejectAuthorized: false
    }
  });

  let HelperOptions = {
    from: '"J²A Widgets" <j2awidgets@gmail.com>',
    to: email,
    subject: `J²A - Re: Your Purchase - Order#${orderId}`,
    html: htmlForEmail
  }

  transporter.sendMail(HelperOptions, (error, info) => {
    if (error) {
      return console.log(error)
    }
    console.log('Message Sent');
    console.log(info);
  })
});






