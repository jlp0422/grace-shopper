import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

// import UserCard from './UserCard';

const Users = (props) => {
  const { users } = props;
  return (
    <div>
      <h2>Users</h2>
      <UserForm />
      <ul className='list-group'>
        {
          users.map(user => (
            <li key={user.id} className='list-group-item'>
              <Link to={`/users/${user.id}`}>
                {user.username}
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

const mapStateToProps = ({ users }) => {
  return {
    users
  }
}

export default connect(mapStateToProps)(Users);
