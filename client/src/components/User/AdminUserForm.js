/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { updateUserOnServer } from '../../store';

class AdminUserForm extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)
    const { user } = this.props
    const { firstName, lastName, email, password, username, isAdmin } = user
    this.state = {
      firstName,
      lastName,
      email,
      password,
      username,
      isAdmin
    }
  }

  render() {
    const { user } = this.props
    const { firstName, lastName, email, password, username, isAdmin } = this.state
    const fields = {
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email Address",
      password: "Password",
      username: "Username",
    }

    return (
      <div>
        <h2>Editing: {`${user.firstName} ${user.lastName}`}</h2>
        { Object.keys(fields).map(field => (
          <div key={field}>
            <label className="font-weight-bold">{fields[field]}</label>
            <input
              className="form-control"
              name={fields[field]}
              value={this.state[field]}
              type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
            />
          </div>
        ))}
      </div>
    )
  }
}

const mapState = ({ users }, { id }) => {
  const user = users.find(user => user.id === id)
  // console.log(user)
  return { user }
}

export default connect(mapState)(AdminUserForm);
