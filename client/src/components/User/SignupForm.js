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
    const fields = {
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email address',
      username: 'Username',
      password: 'Password'
    }
    return (
      <div>
        <form onSubmit={ onCreate }>
          {
            Object.keys(fields).map(field => (
              <div key={field}>
                <label className="font-weight-bold">{fields[field]}</label>
                <input
                  name={field}
                  className="form-control"
                  onChange={onChange}
                  value={this.state[field]}
                  type={field === 'password' ? 'password' : field === 'email' ? 'email' : null }
                />
              </div>
            ))
          }
          <button style={{ marginTop: '15px' }} className="btn btn-primary">Sign up</button>
        </form>
        <h4>Have an account? <a href='#/login'>Log in now</a></h4>
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
