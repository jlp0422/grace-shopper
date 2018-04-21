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
    this.setState({ username: '', password: '' })
  }

  render() {
    const { onChange, onLogin } = this
    const { username, password } = this.state
    return (
      <form onSubmit={ onLogin }>
        <label className="font-weight-bold">Username</label>
        <input
          name="username"
          className="form-control"
          onChange={ onChange }
          value={ username }
        />

        <label className="font-weight-bold">Password</label>
        <input
          name="password"
          className="form-control"
          onChange={ onChange }
          value={ password }
          type="password"
        />

        <button style={{marginTop: '15px'}} className="btn btn-success">Login</button>
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
