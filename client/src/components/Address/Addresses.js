import React from 'react';
import { connect } from 'react-redux';
import AddressForm from './AddressForm';

const Addresses = ({ userAddresses, userId }) => {
  return (
    <div>
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
      <p></p>
      <AddressForm empty={ true } userId={ userId }/>
    </div>
  );
}

const mapState = ( { addresses }, { id }) => {
  const userId = id * 1
  const userAddresses = addresses.filter(address => address.userId === id * 1)
  return { userAddresses, userId }
};

export default connect(mapState)(Addresses);
