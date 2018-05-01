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
      nickname: address ? address.nickname : '',
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
    this.onCancel = this.onCancel.bind(this);
  }
  // ------------------------ LIFECYCLE METHODS ------------------------
  componentWillReceiveProps(nextProps) {
    const { address, userId } = nextProps;
    if (address.id) {
      const { id, nickname, isShipping, street, city, state, zip } = address
      this.setState({ id, nickname, isShipping, street, city, state, zip, userId })
    }
  }

  // ---------------------------- METHODS ----------------------------

  onChange(ev) {
    const change = {}
    change[ev.target.name] = ev.target.value
    this.setState(change);
  }

  onCancel(ev) {
    ev.preventDefault()
    this.setState({
      street: '',
      city: '',
      state: '',
      zip: '',
      isEditing: false
    })
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
    const { deleteAddress, address, empty, admin } = this.props;
    const { onChange, onUpdate, onCancel } = this;
    const fields = {
      nickname: 'Address Nickname',
      street: 'Street',
      city: 'City',
      state: 'State',
      zip: 'Zip Code'
    }
    return (
      <div>
      {
        isEditing ? (
          <button onClick={ onUpdate } className="btn btn-success margin-t-15" disabled={!(street && city && state && zip && isShipping) }>Save</button>
        ) : (
          <button onClick={() => this.setState({ isEditing: true })} className="btn btn-outline-success margin-t-15">{ empty ? ('Add Address') : ('Edit') }</button>
        )
      }
      { empty ? null : <button onClick={() => deleteAddress(id)} className='btn btn-danger margin-t-15'>Delete Address</button> }
      {
        empty && isEditing ? (
          <button onClick={ onCancel } className="btn btn-outline-secondary margin-t-15">Cancel</button>
        ) : null
      }
      <div>
        <label className="font-weight-bold">Address Type</label>
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
              <div key={field}>
                <label className="font-weight-bold">{ fields[field] }</label>
                <input
                  readOnly={isEditing ? false : true}
                  className={`form-control${isEditing ? `` : `-plaintext` }`}
                  placeholder={`${fields[field]}`}
                  name={field}
                  value={this.state[field]}
                  onChange={onChange}
                  style={{ marginBottom: '10px' }}
                />
              </div>
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
