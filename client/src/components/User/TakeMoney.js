import React from 'react';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

import { PAYMENT_SERVER_URL, STRIPE_PUBLISHABLE } from '../../const';

const CURRENCY = 'US';
const fromDollarToCent = (amount) => amount * 100;

const successPayment = data => alert('Payment Successful');
const errorPayment = data => alert('Payment Error');

const onToken = (token) => {
  axios.post(PAYMENT_SERVER_URL, {
    description,
    source: token.id,
    currency: CURRENCY,
    amount: fromDollarToCent(amount)
  })
  .then(successPayment)
  .catch(errorPayment)
}

const TakeMoney = ({ name, description, amount }) => {
  return (
    <StripeCheckout
      name={name}
      description={description}
      amount={fromDollarToCent(amount)}
      token={onToken(amount, description)}
      stripeKey={STRIPE_PUBLISHABLE}
    />
  );

}

export default TakeMoney;
