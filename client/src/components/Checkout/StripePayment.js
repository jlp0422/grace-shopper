import React, { Component } from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

const onToken = (amount, email, orderId) => {
  return (token) => {
    axios.post('/api/stripe', {
      source: token.id,
      amount: amount * 100,
      currency: 'USD',
      receipt_email: email,
      description: `Order# ${orderId}`
    })
    .then(res => res.data)
  }
}

const StripePayment = ({ amount, name, email, orderId }) => {
  return (
    <StripeCheckout
      name={name}
      stripeKey='pk_test_L5BNU52HtQupz1A0XX4pzElV'
      token={onToken(amount, email, orderId)}
      amount={amount * 100}
      email={email}
    />
  );
}

export default StripePayment;

