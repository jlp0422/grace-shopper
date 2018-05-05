/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { attemptLogin, updateUserOnServer } from '../../store'
import { Input, Progress } from 'mdbreact';
import { emailRegex, passwordRegexMedium, passwordRegexStrong } from '../../const'

class LoginForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
      errors: {},
    }
    this.onChange = this.onChange.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.validators = {
      firstName: (value) => {
        if (!value) return 'First name is required!'
      },
      lastName: (value) => {
        if (!value) return 'Last name is required!'
      },
      email: (value) => {
        if (!value) return 'Email is required'
        if (this.props.emails.includes(value)) return 'Email already exists!'
      },
      username: (value) => {
        if (!value) return 'Username is required'
        if (this.props.usernames.includes(value)) return 'Username already exists!'
      },
      password: (value) => {
        if (!value) return 'Password is required'
        if (value.length < 4) return 'Password must be at least 4 characters'
      }
    }
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
      const errors = Object.keys(this.validators).reduce((memo, key) => {
        const validator = this.validators[key]
        const value = this.state[key]
        const error = validator(value)
        if (error) memo[key] = error
        return memo
      }, {})
      this.setState({ errors })
      if (Object.keys(errors).length) return;
      attemptSignup({ firstName, lastName, email, username, password}, 'signup')
    }
    else {
      attemptLogin({ username, password })
    }
  }

  render() {
    const url = location.hash.slice(1)

    const { onChange, onSubmit } = this
    const { firstName, lastName, username, password, email, errors } = this.state
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
                { errors.firstName && <div className="help-block">
                  {errors.firstName}
                </div>
                }
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
                { errors.lastName && <div className="help-block">
                  {errors.lastName}
                </div>
                }
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
                { errors.email && <div className="help-block">
                  {errors.email}
                </div>
                }
              </div>
              <div className="form-group">
                <Input
                  label='Username'
                  name="username"
                  className="form-control"
                  onChange={onChange}
                  value={username}
                />
                { errors.username && <div className="help-block">
                  {errors.username}
                </div>
                }
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
                { errors.password && <div className="help-block">
                  {errors.password}
                </div>
                }
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
  const usernames = users.reduce((memo, user) => {
    memo.push(user.username)
    return memo
  }, [])
  const emails = users.reduce((memo, user) => {
    memo.push(user.email)
    return memo
  }, [])
  return { usernames, emails }
}

const mapDispatch = (dispatch) => {
  return {
    attemptLogin: (credentials) => dispatch(attemptLogin(credentials)),
    attemptSignup: (user, page) => dispatch(updateUserOnServer(user, page))
  }
}

export default connect(mapState, mapDispatch)(LoginForm)
