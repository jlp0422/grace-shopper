import React, { Component } from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

const onToken = (amount, email, orderId, onSave) => {
  return (token) => {
    axios.post('/api/stripe', {
      source: token.id,
      amount: amount * 100,
      currency: 'USD',
      receipt_email: email,
      description: `Order# ${orderId}`
    })
    .then(res => res.data)
    .then(token => {
      if(token) onSave();
    })
  }
}

const StripePayment = ({ amount, name, email, orderId, onSave, shippingId, billingId }) => {
  return (
    <div>
    <StripeCheckout
      name={name}
      stripeKey='pk_test_L5BNU52HtQupz1A0XX4pzElV'
      token={onToken(amount, email, orderId, onSave)}
      amount={amount * 100}
      email={email}
      disabled={!shippingId || !billingId}
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
