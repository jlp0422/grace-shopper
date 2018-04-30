import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteUserOnServer } from '../../store'
/*
THINGS TO ADD
- Check Admin HOC
- Delete user button
- Edit user button
*/

const Users = ({ users, deleteUser }) => {
  return (
    <div>
      <h2>Users</h2>
      <ul className='list-group'>
        {
          users.map(user => (
            <li key={user.id} className='list-group-item'>
              <Link to={`/users/${user.id}`}>
                {`${user.firstName} ${user.lastName}`}
              </Link>
              <button onClick={() => deleteUser(user.id)} className="btn btn-outline-danger">Delete user</button>
              <Link to={`/admin/users/${user.id}`}><button className="btn btn-outline-success">Edit user</button></Link>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

const mapState = ({ users }) => {
  return { users }
}

const mapDispatch = (dispatch) => {
  return {
    deleteUser: (id) => dispatch(deleteUserOnServer(id))
  }
}

export default connect(mapState, mapDispatch)(Users);
