import React from 'react';
import { connect } from 'react-redux';

const Users = (props) => {
  const { users } = props;
  return (
    <div>
      <h2>Users</h2>
      <ul>
        {
          users.map(user => (
            <li key={user.id}>
              {user.username}
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
