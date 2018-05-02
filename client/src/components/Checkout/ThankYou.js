import React from 'react';
import { connect } from "react-redux";
import UserNav from '../User/UserNav';

const ThankYou = ({ user }) => {
  return (
    <div>
      <UserNav user={ user } />
      <div className='jumbotron'>
        <h1>J²A² Widgets</h1>
        <h2>Success!</h2>
        <h3>Thank you for your order!</h3>
      </div>
    </div>
  );
}

const mapState = ({ user }) => {
  return { user }
}

export default connect(mapState)(ThankYou);
