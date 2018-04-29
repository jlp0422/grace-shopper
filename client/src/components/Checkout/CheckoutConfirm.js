import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Addresses from '../Address/Addresses';
// import ActiveOrder from '../Order/ActiveOrder';
import ActiveOrder from '../Order/ActiveOrder';
import PaymentForm from './PaymentForm';


// Need a way to select address to use
// Need to get rid of button "checkout"

const CheckoutConfirm = ({ user }) => {
  console.log('####user##', user)

  if(!user.id) return null

  return (
    <div>
    <ActiveOrder />
    <Addresses id={user.id} page='checkout' />
    <PaymentForm />
    <Link to={`/users/${user.id}/cart/checkout/thankyou`}><button className="btn btn-success">Submit Payment</button></Link>
    </div>
  );
}

const mapState = ({ user }) => {
  // const userAddresses = addresses.filter(address => address.userId === user.id)
  // console.log(user)

  return {
    user,
    // addresses: userAddresses
  }
};

export default connect(mapState)(CheckoutConfirm);
