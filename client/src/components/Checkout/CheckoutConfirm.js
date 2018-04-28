import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Addresses from '../Address/Addresses';
import ActiveOrder from '../Order/ActiveOrder';
import PaymentForm from './PaymentForm';


// Need a way to select address to use
// Need to get rid of button "checkout" 

const CheckoutConfirm = ({user}) => {
  console.log('####user##', user)
  return (
    <div>
    <ActiveOrder />
    <Addresses/>
    <PaymentForm />
    <Link to={`/users/${user.id}/cart/checkout/thankyou`}><button className="btn btn-success">Submit Payment</button></Link>
    </div>
  );
}

const mapState = ({user}) => {
  return { user }
};

export default connect(mapState)(CheckoutConfirm);