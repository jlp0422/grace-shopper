import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AddressForm from './AddressForm';

const AddressCard = (props) => {
  const { address } = props;

  return (
    <div className='row'>
      <div className='col'>
          <AddressForm address={address}/>
        </div>
      </div>
  );
}

const mapState = (state, { address }) => {
 return { address }
}

export default connect(mapState)(AddressCard);
