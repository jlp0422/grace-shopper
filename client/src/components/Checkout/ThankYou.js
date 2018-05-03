import React from 'react';
import { connect } from "react-redux";
import UserNav from '../User/UserNav';

const ThankYou = ({ user, order }) => {
  return (
    <div>
      <UserNav user={ user } />
      <div className='jumbotron'>
        <h1>J²A Widgets</h1>
        <br />
        <h3>Thank you for your order!</h3>
        <br />
        <h4>You will receive an email shortly with details about Order#{order.id}</h4>
      </div>
    </div>
  );
}


const mapState = ({ user, orders }) => {
  const order = orders.find(order => order.userId === user.id)
  return { user, order }
}

export default connect(mapState)(ThankYou);
