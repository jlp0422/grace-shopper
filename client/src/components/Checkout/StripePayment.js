import React, { Component } from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

// console.log(StripeCheckout)

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
    .then(() => {
      // console.log('before', tokenId);
      window.localStorage.setItem('purchase-made', 'true');
      // const token = window.localStorage.getItem('stripeToken');
      // console.log('local storage:', token);
    })
  }
}
// window.localStorage.removeItem('purchase-made');
const onClose = (onSave) => {
  // const tokenId = window.localStorage.getItem('stripeToken');
  if(!!window.localStorage.getItem('purchase-made')) {
    console.log('purchase made')
    // console.log('onClose:', 'purchase made?:', !!tokenId);
    window.localStorage.removeItem('purchase-made');
    onSave();
  } else {
    console.log('purchase not made')
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
      closed={() => onClose(onSave)}
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
