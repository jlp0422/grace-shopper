import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteUserOnServer } from '../../store'

class Users extends React.Component {
  constructor() {
    super()
    this.state = {
      name: '',
      startIndex: 0,
      endIndex: 15
    }
    this.onChange = this.onChange.bind(this)
  }

  onChange(ev) {
    this.setState({ name: ev.target.value, startIndex: 0, endIndex: 15 })
  }
}

const Users = ({ users, deleteUser, orders }) => {
  return (
    <div>
      <h2>Users</h2>
      <ul className='list-group'>
        {
          users.map(user => (
            <li key={user.id} className='list-group-item'>
              <h5>{`${user.firstName} ${user.lastName}`}</h5>
              <Link to={`/admin/users/${user.id}/orders`}><h6>View order history</h6></Link>
              <Link to={`/admin/users/${user.id}`}><button className="btn btn-outline-success">Edit user</button></Link>
              <button onClick={() => deleteUser(user.id)} className="btn btn-outline-danger">Delete user</button>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

const mapState = ({ users, orders }) => {
  return { users, orders }
}

const mapDispatch = (dispatch) => {
  return {
    deleteUser: (id) => dispatch(deleteUserOnServer(id))
  }
}

export default connect(mapState, mapDispatch)(Users);
