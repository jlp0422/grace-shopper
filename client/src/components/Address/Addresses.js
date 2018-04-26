import React from 'react';
import { connect } from 'react-redux';

import AddressCard from './AddressCard';
import AddressForm from './AddressForm';

const Addresses = (props) => {
  const { userAddresses } = props;
  return (
    <div>
      <h2>Addresses</h2>
      <ul className='list-group'>
        {
          userAddresses.map(address => (
            <li key={address.id} className='list-group-item'>
              <AddressCard address={address} />
            </li>
          ))
        }
      </ul>
      <p></p>
      <h3>Add A New Address:</h3>
      <AddressCard />
    </div>
  );
}

const mapState = ( { addresses }, { id }) => {
  const userAddresses = addresses.filter(address => address.id === id * 1)
  return { userAddresses }
};

export default connect(mapState)(Addresses);