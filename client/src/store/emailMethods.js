export const getInfoForCheckoutEmail = (data) => {
  const { user, ownAddresses, /*ownCards,*/ orderId, items, products, shippingId, billingId, /*creditCardId*/ } = data;
  const { email, firstName, lastName } = user;
  const shipping = ownAddresses.find(address => address.id === shippingId)
  const { street, city, state, zip } = shipping;
  // const card = ownCards.find(card => card.id === creditCardId)
  // const { ccType, ccNum } = card;
  const totalPrice = items.reduce((memo, item) => {
    const product = products.find(product => item.productId === product.id)
    memo += (product.price * item.quantity)
    return memo;
  }, 0);
  const productMap = items.reduce((memo, item) => {
    const product = products.find(product => item.productId === product.id)
    const id = product.id;
    memo[id] = {}
    memo[id].name = product.name;
    memo[id].quantity = item.quantity
    memo[id].price = product.price
    return memo;
  }, {})
  const listItems = items.reduce((memo, item) => {
    const product = productMap[item.productId];
    memo += (`
      <li>
        Product #${item.productId}: (${product.quantity}) ${product.name} --- $${product.price}/each
      </li>
    `)
    return memo
  }, '')
  const subject = `J²A - Re: Your Purchase - Order#${orderId}`;
  const htmlForEmail = (`
    <html>
      <head><title>Thank You!</title></head>
      <body>
        <h2>Hello ${firstName}!</h2>
        <p>Thank you so much for your purchase!</p>
        <p>You ordered the following:</p>
        <ul>${listItems}</ul>
        <h4>Total Price: $${totalPrice}.00</h4>



        <p><b>Order#${orderId}</b> will be shipped to:</p>
        <p>
          ${firstName} ${lastName}
          <br />
          ${street}
          <br />
          ${city}, ${state} ${zip}
        </p>
        <h3>Thank You from the Team at J²A Widgets!</h3>
      </body>
    </html>
  `);
  const info = { email, subject, htmlForEmail };
  return info;
}

export const getInfoForSignUpEmail = (data) => {
  const { firstName, email } = data;
  const subject = `Welcome to J²A Widgets, ${firstName}!`
  const htmlForEmail = (`
    <html>
      <head><title>Welcome!</title></head>
      <body>
        <h2>Hello ${firstName}!</h2>
        <p>Thank you for creating an account with J²A Widgets!</p>
        <p>We look forward to providing you with all of the random items you may need!</p>
        <h3>Thank You from the Team at J²A Widgets!</h3>
      </body>
    </html>
  `);
  const info = { email, subject, htmlForEmail };
  return info;
}
