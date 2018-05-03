import React from 'react';
import { connect } from 'react-redux';
import AddressForm from './AddressForm';
import UserNav from '../User/UserNav';

const Addresses = ({ userAddresses, userId, page, user }) => {
  return (
    <div>
      <UserNav user={ user } />
      <h2>Addresses</h2>
      <ul className='list-group'>
        {
          userAddresses.map(address => (
            <li key={address.id} className='list-group-item'>
              <AddressForm userId={ userId } address={address} />
            </li>
          ))
        }
      </ul>
      { page !== 'checkout' ? (
        <ul className="list-group">
          <li className="list-group-item">
            <AddressForm empty={ true } userId={ userId }/>
          </li>
        </ul>
      ) : null }
    </div>
  );
}

const mapState = ( { addresses, user }, { id, page }) => {
  const userId = id * 1
  const userAddresses = addresses.filter(address => address.userId === id * 1)
  return { userAddresses, userId, page, user }
};

export default connect(mapState)(Addresses);
