/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateAddressOnServer } from '../../store';

class AddressForm extends Component {
  constructor(props) {
    super(props);
      const { address } = props;
      this.state = {
        id: address ? address.id : '',
        isShipping: address ? address.isShipping : '',
        street: address ? address.street : '',
        city: address ? address.city : '',
        state: address ? address.state : '',
        zip: address ? address.zip : ''
      }
// ---------------------------- BIND METHOD ----------------------------
      this.handleChange = this.handleChange.bind(this);
      this.onSave = this.onSave.bind(this);
    }
// ------------------------ LIFECYCLE METHODS ------------------------

  // componentWillReceiveProps(nextProps) {
  //   const { address } = nextProps;
  //   this.setState(nextProps);
  // }
// ---------------------------- METHODS ----------------------------
  handleChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  onSave(ev) {
    ev.preventDefault();
    const { street, city, state, zip } = this.state;
    this.props.updateAddress(this.state);
  }

// --------------------------- RENDER -------------------------

  render() {
    const { handleChange, onSave } = this;
    const fields = {
      street: 'Street',
      city: 'City',
      state: 'State',
      zip: 'Zip Code'
    }
    return (
      <div>
        <form onSubmit={onSave}>
        {/* Drop-down list for Shipping or Billing */}
          {
            Object.keys(fields).map(field => (
              <input
                key={field}
                className='form-control'
                placeholder={`${fields[field]}`}
                name={field}
                value={this.state[field]}
                onChange={handleChange}
                style={{ marginBottom: '10px' }}
              />
            ))
          }
          <button className='btn btn-primary'>Save</button>
        </form>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateAddress: (address) => dispatch(updateAddressOnServer(address))
  };
};

export default connect(null, mapDispatch)(AddressForm);
