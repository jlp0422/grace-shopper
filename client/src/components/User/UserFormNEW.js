/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { updateUserOnServer, updateLoggedUser } from '../../store';
import { Input, Button } from 'mdbreact';

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    const { user } = this.props;
    const { id } = user
    this.state = {
      id: id ? user.id : '',
      firstName: id ? user.firstName : '',
      lastName: id ? user.lastName : '',
      username: id ? user.username : '',
      password: id ? user.password : '',
      email: id ? user.email : '',
      isEditing: false
    }
    this.onChange = this.onChange.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { user } = nextProps;
    const { id, firstName, lastName, username, email, password } = user
    this.setState({ id, firstName, lastName, username, email, password })
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
        <h2>Edit Account</h2>
        <form>
          {
            Object.keys(fields).map(field => (
              <div className="" key={field}>
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
        </form>
        {
          isEditing ? (
            <button onClick={ onUpdate } style={{ marginTop: '15px' }} className="btn btn-success">Save</button>
          ) : (
            <button onClick={() => this.setState({ isEditing: true })} style={{ marginTop: '15px' }} className="btn btn-outline-success">Edit</button>
          )
        }
      </div>
    )
  }
}

const mapState = ({user}) => {
  return { user }
}

const mapDispatch = (dispatch) => {
  return {
    updateUser: (user) => dispatch(updateUserOnServer(user)),
    updateLogged: (user) => dispatch(updateLoggedUser(user))
  }
}

export default connect(mapState, mapDispatch)(UserForm);
