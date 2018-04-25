/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { attemptLogin, updateUserOnServer } from '../../store'
import { Button, Input } from 'mdbreact'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: ''
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
  }

  onChange(ev) {
    const change = {}
    change[ev.target.name] = ev.target.value
    this.setState(change)
  }

  onSubmit(ev) {
    ev.preventDefault()
    const url = location.hash.slice(1)
    const { firstName, lastName, email, username, password } = this.state
    const { attemptLogin, attemptSignup } = this.props
    if (url === '/signup') attemptSignup(this.state)
    else attemptLogin({ username, password })
    this.setState({ username: '', password: '' })
  }

  render() {
    const url = location.hash.slice(1)
    const { onChange, onSubmit } = this
    const { username, password } = this.state
    const fields = {
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email address',
      username: 'Username',
      password: 'Password'
    }
    return (
      <div>
        <form onSubmit={ onSubmit }>
        {
          url === '/signup' ? (
            Object.keys(fields).map(field => (
              <div key={field}>
                {/* <label className="font-weight-bold">{fields[field]}</label> */}
                <Input
                  label={fields[field]}
                  name={field}
                  className="form-control"
                  onChange={onChange}
                  value={this.state[field]}
                  type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
                />
              </div>
            ))
          ) : (
            <div>
             {/* <label className="font-weight-bold">Username</label> */}
              <Input
                label='Username'
                name="username"
                className="form-control"
                onChange={onChange}
                value={username}
              />

            {/*  <label className="font-weight-bold">Password</label> */}
              <Input
                label='Password'
                name="password"
                className="form-control"
                onChange={onChange}
                value={password}
                type="password"
              />
            </div>
          )
        }
          <button style={{marginTop: '15px'}} className="btn btn-success">{
            url === '/signup' ? ('Create account') : ('Log in')
          }</button>
        </form>
        { url === '/signup' ?
          <h4>Have an account? <a href='#/login'>Log in now</a></h4>
          :
          <h4>Don't have an account? <a href='#/signup'>Create one now</a></h4>
        }
      </div>
    )
  }
}

const mapDispatch = (dispatch) => {
  return {
    attemptLogin: (credentials) => dispatch(attemptLogin(credentials)),
    attemptSignup: (user) => dispatch(updateUserOnServer(user))
  }
}

export default connect(null, mapDispatch)(LoginForm)
