/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateAddressOnServer, deleteAddressFromServer } from '../../store';
// import { Input, Button } from 'mdbreact';

class AddressForm extends Component {
  constructor(props) {
    super(props);
    const { address, userId } = this.props;
    this.state = {
      id: address ? address.id : '',
      isShipping: address ? address.isShipping : true,
      street: address ? address.street : '',
      city: address ? address.city : '',
      state: address ? address.state : '',
      zip: address ? address.zip : '',
      userId: userId,
      isEditing: false
    }
    // ---------------------------- BIND METHOD ----------------------------
    this.onChange = this.onChange.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }
  // ------------------------ LIFECYCLE METHODS ------------------------
  componentWillReceiveProps(nextProps) {
    const { address, userId } = nextProps;
    if (address.id) {
      const { id, isShipping, street, city, state, zip } = address
      this.setState({ id, isShipping, street, city, state, zip, userId })
    }
  }

  // ---------------------------- METHODS ----------------------------

  onChange(ev) {
    const change = {}
    change[ev.target.name] = ev.target.value
    this.setState(change);
  }

  onUpdate(ev) {
    ev.preventDefault()
    const { updateAddress, deleteAddress } = this.props;
    const { id, isShipping, street, city, state, zip, userId } = this.state
    updateAddress({ id, isShipping, street, city, state, zip, userId });
    this.setState({ isEditing: false, id: '', isShipping: true, street: '', city: '', state: '', zip:'' })
  }

  // --------------------------- RENDER -------------------------

  render() {
    const { id, isShipping, isEditing, street, city, state, zip } = this.state;
    const { deleteAddress, address, empty } = this.props;
    const { onChange, onUpdate } = this;
    const fields = {
      street: 'Street',
      city: 'City',
      state: 'State',
      zip: 'Zip Code'
    }
    return (
      <div>
      {
        isEditing ? (
          <button onClick={ onUpdate } className="btn btn-success margin-t-15">Save</button>
        ) : (
          <button onClick={() => this.setState({ isEditing: true })} className="btn btn-outline-success margin-t-15">{ empty ? ('Add Address') : ('Edit') }</button>
        )
      }
      <div>
        <button onClick={() => deleteAddress(id)} className='btn btn-danger'>Delete Address</button>
          <select
            onChange={onChange}
            name='isShipping'
            disabled={isEditing ? false : true}
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
        </div>
      </div>
    );
  }
}

const mapState = (state, { userId }) => {
  return { userId }
}

const mapDispatch = (dispatch) => {
  return {
    updateAddress: (address) => dispatch(updateAddressOnServer(address)),
    deleteAddress: (id) => dispatch(deleteAddressFromServer(id))
  };
};

export default connect(mapState, mapDispatch)(AddressForm);
