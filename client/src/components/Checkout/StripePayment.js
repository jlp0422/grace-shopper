import React, { Component } from 'react';
import axios from 'axios';
import StripeCheckout from 'react-stripe-checkout';

class StripePayment extends Component {
  constructor() {
    super();
    this.onToken = this.onToken.bind(this);
  }

  onToken(token) {
    axios.post('/api/stripe', {
      source: token.id,
      amount: 500 * 100,
      currency: 'USD',
      receipt_email: 'jgrubard@gmail.com'
    })
    .then(res => res.data)
  }

  render() {
    const { onToken } = this;
    return (
      <StripeCheckout
        name='Jeremy Grubard'
        stripeKey='pk_test_L5BNU52HtQupz1A0XX4pzElV'
        token={onToken}
        amount={500 * 100}
        email='jgrubard@gmail.com'
      />
    );
  }
}

export default StripePayment;

