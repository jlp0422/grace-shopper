import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Addresses from '../Address/Addresses';
import ActiveOrder from '../Order/ActiveOrder';
import Dropdown from './Dropdown';

const CheckoutConfirm = ({ user, billingAddresses, shippingAddresses, ownCards }) => {
  return (
    <div>
      <ActiveOrder />
      <br />
      <div className='row'>
        <div className='col'>
          <h5>Select Shipping Address:</h5>
          <Dropdown items={shippingAddresses} title='Shipping Address' />
        </div>
        <div className='col'>
          <h5>Select Billing Address:</h5>
          <Dropdown items={billingAddresses} title='Billing Address' />
        </div>
      </div>
      <br />
      <h5>Select Credit Card:</h5>
        <Dropdown items={ownCards} title='Credit Card'/>
    </div>
  );
}

const mapState = ({ user, addresses, creditCards }) => {
  const billingAddresses = addresses.filter(address => user.id === address.userId && !address.isShipping)
  const shippingAddresses = addresses.filter(address => user.id === address.userId && address.isShipping)
  const ownCards = creditCards.filter(card => card.userId === user.id)
  return {
    user,
    billingAddresses,
    shippingAddresses,
    ownCards
  }
};

export default connect(mapState)(CheckoutConfirm);
