// require('dotenv').config();
import React, { Component } from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

// console.log(process.env.STRIPE_PUBLISHABLE_KEY);

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

const StripePayment = ({ amount, name, email, orderId, onSave, checkErrors, shippingId, billingId }) => {
  return (
    <div>
    <StripeCheckout
      name={name}
      stripeKey='pk_test_L5BNU52HtQupz1A0XX4pzElV'
      token={onToken(amount, email, orderId)}
      amount={amount * 100}
      email={email}
      disabled={!shippingId || !billingId}
      closed={onSave}
    />
    {
      !shippingId || !billingId ? (
        <span className='help-block'>Please select Shipping and Billing Addresses to Submit Payment</span>
      ) : null
    }
    </div>

  );
}

export default StripePayment;
