/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { updateUserOnServer, updateLoggedUser } from '../../store';
import UserNav from './UserNav';
import { Helmet } from 'react-helmet';

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    const { user } = this.props;
    this.state = {
      id: user.id ? user.id : '',
      firstName: user.id ? user.firstName : '',
      lastName: user.id ? user.lastName : '',
      username: user.id ? user.username : '',
      password: user.id ? user.password : '',
      email: user.id ? user.email : '',
      isEditing: false
    }
    this.onChange = this.onChange.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { user } = nextProps;
    if (user.id) {
      const { id, firstName, lastName, username, email, password } = user
      this.setState({ id, firstName, lastName, username, email, password })
    }
  }

  onChange(ev) {
    const change = {}
    change[ev.target.name] = ev.target.value
    this.setState(change);
  }

  onUpdate(ev) {
    ev.preventDefault()
    const { updateUser, updateLogged } = this.props;
    const { id, firstName, lastName, username, email, password } = this.state
    updateUser({ id, firstName, lastName, username, email, password });
    updateLogged({ id, firstName, lastName, username, email, password });
    this.setState({ isEditing: false })
  }

  render() {
    const { onChange, onUpdate } = this;
    const { user } = this.props
    const { firstName, lastName, email, username, password, isEditing } = this.state;
    const fields = {
      firstName: 'First name',
      lastName: 'Last name',
      email: 'Email address',
      username: 'Username',
      password: 'Password'
    }
    return (
      <div>
        {user.firstName && <Helmet><title>Edit {user.firstName}'s Account | J²A</title></Helmet>}
        <UserNav user={ user } />
        <h2>Edit Account</h2>
        {
          isEditing ? (
            <button onClick={ onUpdate } className="btn btn-success margin-t-15">Save</button>
          ) : (
            <button onClick={() => this.setState({ isEditing: true })} className="btn btn-outline-success margin-t-15">Edit</button>
          )
        }
        <div className="margin-t-15">
          {
            Object.keys(fields).map(field => (
              <div className="margin-b-10" key={field}>
              <label className="font-weight-bold">{fields[field]}</label>
              <input
              name={field}
              readOnly={isEditing ? false : true}
              className={`form-control${isEditing ? `` : `-plaintext` }`}
              onChange={onChange}
              value={this.state[field]}
              type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text' }
              />
              </div>
            ))
          }
        </div>
      </div>
    )
  }
}

const mapState = ({ user }) => {
  return { user }
}

const mapDispatch = (dispatch) => {
  return {
    updateUser: (user) => dispatch(updateUserOnServer(user)),
    updateLogged: (user) => dispatch(updateLoggedUser(user))
  }
}

export default connect(mapState, mapDispatch)(UserForm);
