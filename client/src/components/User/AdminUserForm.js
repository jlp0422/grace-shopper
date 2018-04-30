/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
    this.onChange = this.onChange.bind(this)
  }

  onChange(ev) {
    // ev.preventDefault()
    const change = {}
    change[ev.target.name] = ev.target.value
    this.setState(change)
  }

  render() {
    const { user } = this.props
    const { firstName, lastName, email, password, username, isAdmin } = this.state
    const { onChange } = this
    const fields = {
      firstName: "First Name",
      lastName: "Last Name",
      email: "Email Address",
      password: "Password",
      username: "Username",
    }
    console.log(isAdmin)
    return (
      <div>
        <h2>Editing: {`${user.firstName} ${user.lastName}`}</h2>
        { Object.keys(fields).map(field => (
          <div key={field} className="margin-b-10">
            <label className="font-weight-bold">{fields[field]}</label>
            <input
              onChange={ onChange }
              className="form-control"
              name={field}
              value={this.state[field]}
              type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
            />
          </div>
        ))}
        <h6 className="font-weight-bold">User Type</h6>
        <div className="form-check">
          <input onChange={onChange} className="form-check-input" type="radio" name="isAdmin" value={true} />
          <label className="form-check-label">Administrator</label>
        </div>
        <div className="form-check margin-b-10">
          <input onChange={onChange} className="form-check-input" type="radio" name="isAdmin" value={false} />
          <label className="form-check-label">Not Adminstrator</label>
        </div>

        <button className="btn btn-success">Save User</button>
        <Link to='/admin/users'><button className="btn btn-info">Cancel Edit</button></Link>
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
