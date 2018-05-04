/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { attemptLogin, updateUserOnServer } from '../../store'
import { Button, Input, Progress, Fa } from 'mdbreact'

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
    if (url === '/signup') attemptSignup(this.state, 'signup')
    else attemptLogin({ username, password })
    this.setState({ username: '', password: '' })
  }

  render() {
    const url = location.hash.slice(1)
    const emailRegex = RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")
    const passwordRegexMedium = RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
    const passwordRegexStrong = RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    const { onChange, onSubmit } = this
    const { username, password, email } = this.state
    const passwordTestStrong = passwordRegexStrong.test(password)
    const passwordTestMedium = passwordRegexMedium.test(password)
    const isEmail = emailRegex.test(email)
    const fields = {
      firstName: 'First name',
      lastName: 'Last name',
    }
    return (
      <div className="login-form">
        <h3>{ url === '/signup' ? ('Sign up for an account') : ('Log in to your account')}</h3>
        <div>
        {
          url === '/signup' ? (
            <div>
            {Object.keys(fields).map(field => (
              <div key={field}>
                {/* <label className="font-weight-bold">{fields[field]}</label> */}
                <Input
                  label={fields[field]}
                  name={field}
                  className="form-control"
                  onChange={onChange}
                  value={this.state[field]}
                  type="text"
                />
              </div>
            )) }
                <Input
                  label="Email address"
                  name="email"
                  className="form-control"
                  onChange={onChange}
                  value={email}
                  type='email'
                />
                <Input
                  label='Username'
                  name="username"
                  className="form-control"
                  onChange={onChange}
                  value={username}
                />
                <Input
                  label='Password'
                  name="password"
                  className="form-control"
                  onChange={onChange}
                  value={password}
                  type="password"
                />
                {/*<div className={`password-regex
                  ${passwordTestStrong ? ('pw-strong') : `${passwordTestMedium ? ('pw-medium') : ('pw-weak')}`}`
                }>*/}
                <div>
                { passwordTestStrong ? (
                  <Progress value={100} color={"success"} />
                ) : (
                  passwordTestMedium ? (
                    <Progress value={67} color={"warning"} />
                  ) : (
                    password ? (
                      <Progress value={33} color={"danger"} />
                    ) : (
                      <Progress value={0} color={"danger"} />
                    )
                  )
                  ) }
                </div>
            </div>
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
        </div>
        <button onClick={ onSubmit } className="btn btn-success margin-t-15">
          { url === '/signup' ? ('Create account') : ('Log in') }
        </button>
        { url === '/signup' ?
          <p className="margin-t-15">Have an account? <a href='#/login'>Log in now &raquo;</a></p>
          :
          <p className="margin-t-15">Don't have an account? <a href='#/signup'>Create one now &raquo;</a></p>
        }
        {/*<div className="fb-login-button" data-max-rows="1" data-size="large" data-button-type="continue_with" data-show-faces="false" data-auto-logout-link="false" data-use-continue-as="false"></div>*/}
      </div>
    )
  }
}

const mapDispatch = (dispatch) => {
  return {
    attemptLogin: (credentials) => dispatch(attemptLogin(credentials)),
    attemptSignup: (user, page) => dispatch(updateUserOnServer(user, page))
  }
}

export default connect(null, mapDispatch)(LoginForm)
