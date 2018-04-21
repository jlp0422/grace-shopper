/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { attemptLogin } from '../../store'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      password: ''
    }
    this.onChange = this.onChange.bind(this)
    this.onLogin = this.onLogin.bind(this)
  }

  onChange(ev) {
    const change = {}
    change[ev.target.name] = ev.target.value
    this.setState(change)
  }

  onLogin(ev) {
    ev.preventDefault()
    const { username, password } = this.state
    const { attemptLogin } = this.props
    attemptLogin({ username, password })
    // console.log('username: ', username)
    // console.log('password: ', password)
  }

  render() {
    const { onChange, onLogin } = this
    const { username, password } = this.state
    return (
      <form onSubmit={ onLogin }>
        <label>Username</label>
        <input
          name="username"
          onChange={ onChange }
          value={ username }
        />

        <label>Password</label>
        <input
          name="password"
          onChange={ onChange }
          value={ password }
        />

        <button>Login</button>
      </form>
    )
  }
}

const mapDispatch = (dispatch) => {
  return {
    attemptLogin: (credentials) => dispatch(attemptLogin(credentials))
  }
}

export default connect(null, mapDispatch)(LoginForm)
