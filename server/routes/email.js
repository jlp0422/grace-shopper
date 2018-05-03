const app = require('express').Router();
module.exports = app;

const nodemailer = require('nodemailer')

app.post('/', (req, res, next) => {
  const { user, shipping, billing, totalCost, ownProducts } = req.body.info
  const { email, firstName } = user;
  const { street, city, state, zip } = shipping;
  const plural = ownProducts.length > 1 ? 's' : '';
  const productString = ownProducts.reduce((memo, product, index, array) => {
    if(array.length === 1) return memo + product.name
    if(index !== array.length - 1) {
      return memo + `${product.name}, `
    }
    return memo.slice(0,-2) + ` & ${product.name}`
  }, '')
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
    subject: 'Re: Your Recent Purchase',
    // text: `Thank you ${firstName} for your purchase${plural} of ${productString}! Your order will be sent to ${street}, ${city}, ${state} ${zip}. Your total cost is $${totalCost}.00`
    html: (`
      <div>
        <h3>Hello ${firstName}!</h3>
        <p>Thank you so much for your purchase!</p>
        <p>Your ${productString} will be sent out shortly to the shipping address you provided:</p>
        <p>${street}</p>
        <p>${city}, ${state} ${zip}</p>
        <h4>Thank you for your payment of $${totalCost}.00!</h4>
      </div>
    `)
  }

  transporter.sendMail(HelperOptions, (error, info) => {
    if (error) {
      return console.log(error)
    }
    console.log('Message Sent');
    console.log(info);
  })
});






