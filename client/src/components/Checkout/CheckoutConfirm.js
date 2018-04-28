import React from 'react';
import { connect } from 'react-redux';
import Addresses from '../Address/Addresses';
import ActiveOrder from '../Order/ActiveOrder';
import PaymentForm from './PaymentForm';

// Issue with route / url
// Need a way to select address to use
// Need to get rid of button "checkout" 

const CheckoutConfirm = ({userId}) => {
  console.log('####user##', userId)
  return (
    <div>
    <ActiveOrder />
    <Addresses id={userId}/>
    <PaymentForm />
    <button className="btn btn-success">Submit Payment</button>
    </div>
  );
}

const mapState = ({id}) => {
  const userId = id * 1
  return { userId }
};

export default connect(mapState)(CheckoutConfirm);