import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Addresses from '../Address/Addresses';
import ActiveOrder from '../Order/ActiveOrder';
import Dropdown from './Dropdown';

// Need a way to select address to use
// Need to get rid of button "checkout"

const CheckoutConfirm = ({ user, billingAddresses, shippingAddresses }) => {

  console.log('Bill:', billingAddresses)
  console.log('Ship:', shippingAddresses)

  if(!user.id) return null
  return (
    <div>
    <ActiveOrder />
    <label>Select Shipping Address:</label>
    <Dropdown addresses={shippingAddresses} title='Shipping' />
    <label>Select Billing Address:</label>
    <Dropdown addresses={billingAddresses} title='Billing' />
    <label>Select Credit Card:</label>
    <Dropdown title='Credit Card'/>
    </div>
  );
}

const mapState = ({ user, addresses }) => {
  const billingAddresses = addresses.filter(address => user.id === address.userId && !address.isShipping)
  const shippingAddresses = addresses.filter(address => user.id === address.userId && address.isShipping)
  return {
    user,
    billingAddresses,
    shippingAddresses
  }
};

export default connect(mapState)(CheckoutConfirm);
