/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { updateUserOnServer, updateLoggedUser } from '../../store';
import { Input, Button } from 'mdbreact';

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    const { user } = props;
    const { id } = user
    this.state = {
      firstName: id ? user.firstName : '',
      lastName: id ? user.lastName : '',
      username: id ? user.username : '',
      password: id ? user.password : '',
      email: id ? user.email : '',
    }
    this.onChange = this.onChange.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { user } = nextProps;
    this.setState(user)
  }

  onChange(ev) {
    const change = {}
    change[ev.target.name] = ev.target.value
    this.setState(change);
  }

  onUpdate(ev) {
    ev.preventDefault()
    const { updateUser, updateLogged } = this.props;
    updateUser(this.state);
    updateLogged(this.state);
  }

  render() {
    const { onChange, onUpdate } = this;
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
        <form onSubmit={ onUpdate }>
          {
            Object.keys(fields).map(field => (
              <div key={field}>
                <label className="font-weight-bold">{fields[field]}</label>
                <input
                  label={fields[field]}
                  name={field}
                  className="form-control"
                  onChange={onChange}
                  value={this.state[field]}
                  type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text' }
                />
              </div>
            ))
          }
          <button style={{ marginTop: '15px' }} className="btn btn-primary">Update</button>
        </form>
      </div>
    )
  }
}

const mapState = ({user}) => {
  // console.log(user)
  return { user }
}

const mapDispatch = (dispatch) => {
  return {
    updateUser: (user) => dispatch(updateUserOnServer(user)),
    updateLogged: (user) => dispatch(updateLoggedUser(user))
  }
}

export default connect(null, mapDispatch)(UserForm);
