/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateAddressOnServer } from '../../store';
import { Input, Button } from 'mdbreact';

class AddressForm extends Component {
  constructor(props) {
    super(props);
    const { address, deleteAddress } = props;
    this.state = {
      id: address ? address.id : '',
      isShipping: address ? address.isShipping : '',
      street: address ? address.street : '',
      city: address ? address.city : '',
      state: address ? address.state : '',
      zip: address ? address.zip : '',
      isEditing: false
    }
    // ---------------------------- BIND METHOD ----------------------------
    this.onChange = this.onChange.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }
  // ------------------------ LIFECYCLE METHODS ------------------------


  // ---------------------------- METHODS ----------------------------
  componentWillReceiveProps(nextProps) {
    const { address } = nextProps;
    if (address.id) {
      const { id, isShipping, street, city, state, zip } = address
      this.setState({ id, isShipping, street, city, state, zip  })
    }
  }
 
  onChange(ev) {
    const change = {}
    change[ev.target.name] = ev.target.value
    this.setState(change);
  }

  onUpdate(ev) {
    ev.preventDefault()
    const { updateAddress, deleteAddress } = this.props;
    const { id, isShipping, street, city, state, zip } = this.state
    updateAddress({ id, isShipping, street, city, state, zip });
    this.setState({ isEditing: false })
  }

  // --------------------------- RENDER -------------------------

  render() {
    const { isShipping, isEditing, street, city, state, zip } = this.state;
    const { onChange, onUpdate } = this;
    const fields = {
      street: 'Street',
      city: 'City',
      state: 'State',
      zip: 'Zip Code'
    }
    return (
      <div>
      <form>
      {
        isEditing ? (
          <button onClick={ onUpdate } style={{ marginTop: '15px' }} className="btn btn-success">Save</button>
        ) : (
          <button onClick={() => this.setState({ isEditing: true })} style={{ marginTop: '15px' }} className="btn btn-outline-success">Edit</button>
        )
      }
      <button onClick={() => deleteAddress(address.id)} className='btn btn-danger'>Delete Address</button>
          <select
            onChange={onChange}
            name='isShipping'
            readOnly={isEditing ? false : true}
            className={`form-control${isEditing ? `` : `-plaintext` }`}
          >
            <option value={true}>Shipping</option>  
            <option value={false}>Billing</option>
          </select>
          {
            Object.keys(fields).map(field => (
              <input
                key={field}
                readOnly={isEditing ? false : true}
                className={`form-control${isEditing ? `` : `-plaintext` }`}
                placeholder={`${fields[field]}`}
                name={field}
                value={this.state[field]}
                onChange={onChange}
                style={{ marginBottom: '10px' }}
              />
            ))
          }
        </form>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateAddress: (address) => dispatch(updateAddressOnServer(address)),
    deleteAddress: (address) => dispatch(deleteAddressFromServer(address))
  };
};

export default connect(null, mapDispatch)(AddressForm);