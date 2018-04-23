/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { updateUserOnServer } from '../../store'

class SignupForm extends React.Component {
  constructor() {
    super();
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: ''
    }
    this.onChange = this.onChange.bind(this);
    this.onCreate = this.onCreate.bind(this);
  }

  onChange(ev) {
    const change = {}
    change[ev.target.name] = ev.target.value
    this.setState(change);
  }

  onCreate(ev) {
    ev.preventDefault()
    const { createUser } = this.props;
    createUser(this.state);
  }

  render() {
    const { onChange, onCreate } = this;
    const { firstName, lastName, email, username, password } = this.state;
    return (
      <div>
        <form onSubmit={ onCreate }>
          <label className="font-weight-bold">First name</label>
          <input
            name="firstName"
            className="form-control"
            onChange={onChange}
            value={firstName}
          />

          <label className="font-weight-bold">Last name</label>
          <input
            name="lastName"
            className="form-control"
            onChange={onChange}
            value={lastName}
          />

          <label className="font-weight-bold">Email address</label>
          <input
            name="email"
            className="form-control"
            onChange={onChange}
            value={email}
            type="email"
          />

          <label className="font-weight-bold">Username</label>
          <input
            name="username"
            className="form-control"
            onChange={onChange}
            value={username}
          />

          <label className="font-weight-bold">Password</label>
          <input
            name="password"
            className="form-control"
            onChange={onChange}
            value={password}
            type="password"
          />

          <button style={{ marginTop: '15px' }} className="btn btn-primary">Sign up</button>
        </form>
      </div>
    )
  }
}

const mapDispatch = (dispatch) => {
  return {
    createUser: (user) => dispatch(updateUserOnServer(user))
  }
}

export default connect(null, mapDispatch)(SignupForm);
