/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { attemptLogin, updateUserOnServer } from '../../store'
import { Input, Progress } from 'mdbreact'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      errors: [],
      error: {}
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
    const { attemptLogin, attemptSignup, usernames } = this.props
    if (url === '/signup') {
      // checking to see if new user is signing up with existing username
      usernames.includes(username) ? (
        console.log('username exists')
      ) : (
        attemptSignup({ firstName, lastName, email, username, password}, 'signup')
      )
    }
    else {
      attemptLogin({ username, password })
    }
  }

  render() {
    const url = location.hash.slice(1)
    const emailRegex = RegExp("^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$")
    const passwordRegexMedium = RegExp("^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{6,})");
    const passwordRegexStrong = RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    const { onChange, onSubmit } = this
    const { firstName, lastName, username, password, email } = this.state
    const passwordTestStrong = passwordRegexStrong.test(password)
    const passwordTestMedium = passwordRegexMedium.test(password)
    const isEmail = emailRegex.test(email)
    return (
      <div className="login-form">
        <h3>{ url === '/signup' ? ('Sign up for an account') : ('Log in to your account')}</h3>
        <div>
        {
          url === '/signup' ? (
            <div>
              <div className="form-group">
                <Input
                  label="First name"
                  name="firstName"
                  className="form-control"
                  onChange={onChange}
                  value={firstName}
                  type="text"
                />
                <div className="help-block">
                  First name is required!
                </div>
              </div>
              <div className="form-group">
                <Input
                  label="Last name"
                  name="lastName"
                  className="form-control"
                  onChange={onChange}
                  value={lastName}
                  type="text"
                />
                <div className="help-block">
                  Last name is required!
                </div>
              </div>
              <div className="form-group">
                <Input
                  label="Email address"
                  name="email"
                  className="form-control"
                  onChange={onChange}
                  value={email}
                  type='email'
                />
                <div className="help-block">
                  Please enter a valid email address // Email address already exists!
                </div>
              </div>
              <div className="form-group">
                <Input
                  label='Username'
                  name="username"
                  className="form-control"
                  onChange={onChange}
                  value={username}
                />
                <div className="help-block">
                  Username is required! // Username already exists!
                </div>
              </div>
              <div className="form-group">
                <Input
                  label='Password'
                  name="password"
                  className="form-control"
                  onChange={onChange}
                  value={password}
                  type="password"
                />
                <div className="help-block">
                  Password must be at least 4 characters
                </div>
              </div>
              { passwordTestStrong ? (
                <Progress value={100} color={"success"} />
                ) : (
                passwordTestMedium ? (
                  <Progress value={67} color={"warning"} />
                ) : (
                password.length > 3 ? (
                  <Progress value={33} color={"danger"} />
                ) : (
                  <Progress value={0} color={"danger"} />
                  )
                ) )
              }
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

const mapState = ({ users }) => {
  const usernames = users.reduce((memo, item) => {
    memo.push(item.username)
    return memo
  }, [])
  // console.log(usernames)
  return { usernames }
}

const mapDispatch = (dispatch) => {
  return {
    attemptLogin: (credentials) => dispatch(attemptLogin(credentials)),
    attemptSignup: (user, page) => dispatch(updateUserOnServer(user, page))
  }
}

export default connect(mapState, mapDispatch)(LoginForm)
