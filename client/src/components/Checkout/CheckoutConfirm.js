import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Addresses from '../Address/Addresses';
import ActiveOrder from '../Order/ActiveOrder';
import Dropdown from './Dropdown';

const CheckoutConfirm = ({ user, ownAddresses, ownCards }) => {
  return (
    <div>
      <ActiveOrder />
        <br />
      <div className='row'>
        <div className='col'>
          <h5>Select Shipping Address:</h5>
          <Dropdown items={ownAddresses} title='Shipping Address' />
        </div>
        <div className='col'>
          <h5>Select Billing Address:</h5>
          <Dropdown items={ownAddresses} title='Billing Address' />
        </div>
      </div>
      <Link to={`/users/${user.id}/addresses`}>
        <button className='btn btn-primary'>Add New Address</button>
      </Link>
        <br />
        <br />
      <h5>Select Credit Card:</h5>
        <Dropdown items={ownCards} title='Credit Card'/>
          <Link to={`/users/${user.id}/creditCards`}>
            <button className='btn btn-info'>Add New Card</button>
          </Link>
        <button className='btn btn-success'>Submit Payment</button>
    </div>
  );
}

const mapState = ({ user, addresses, creditCards }) => {
  const ownAddresses = addresses.filter(address => user.id === address.userId)
  const ownCards = creditCards.filter(card => card.userId === user.id)
  return {
    user,
    ownAddresses,
    ownCards
  }
};

export default connect(mapState)(CheckoutConfirm);
