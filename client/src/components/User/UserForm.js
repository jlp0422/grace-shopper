/* eslint-disable */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUserOnServer } from '../../store';

class UserForm extends Component {
  constructor(props) {
    super(props);
    const { user } = props;
    this.state = {
      id: user ? user.id : null,
      firstName: user ? user.firstName : '',
      lastName: user ? user.lastName : '',
      isAdmin: user ? user.isAdmin : '',
      username: user ? user.username : '',
      password: user ? user.password : '',
      email: user ? user.email : '',
      street: user ? user.street : '',
      city: user ? user.city : '',
      state: user ? user.state : '',
      zip: user ? user.zip : '',
      inputError: [],
      inputEdited: {}
    }
    // ---------------------------- VALIDATORS ----------------------------
    this.validators = {
      email: value => {
        const emailFormat = /\S+@\S+\.\S+/;
        if (!emailFormat.test(value)) {
          return `e-mail must be valid e-mail format with @`;
        }
      }
    };

    // ---------------------------- BIND METHOD ----------------------------
    this.handleChange = this.handleChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  // ---------------------------- METHODS ----------------------------

  handleChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  onSave(ev) {
    const { firstName, lastName, isAdmin, username, password, email, street, city, state, zip } = this.state
    ev.preventDefault();
    this.props.updateUser(this.state);
    this.setState({
      firstName: '',
      lastName: '',
      isAdmin: '',
      username: '',
      password: '',
      email: '',
      street: '',
      city: '',
      state: '',
      zip: ''
    });
  }

  // --------------------------- RENDER -------------------------

  render() {
    const { firstName, lastName, isAdmin, username, password, email, street, city, state, zip } = this.state;
    const { users } = this.props;
    const { handleChange, onSave } = this;
    const fields = {
      firstName: 'First Name', lastName: 'Last Name', username: 'Username',
      password: 'Password', email: 'email',
      street: 'Street', city: 'City', state: 'State', zip: 'Zip'
    }
    return (
      <div>
        <form onSubmit={onSave}>
          {
            Object.keys(fields).map(field => (
              <div key={field} className=''>
                <input
                  className='form-control'
                  placeholder={`${field}`}
                  name='name'
                  value={this.state[field]}
                  onChange={handleChange}
                  style={{ marginBottom: '10px' }}
                />
              </div>
            ))
          }
          <button style={{ marginBottom: '10px' }} className='btn btn-primary'>Submit</button>
        </form>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    updateUser: (user) => dispatch(updateUserOnServer(user))
  };
};

export default connect(null, mapDispatch)(UserForm);
