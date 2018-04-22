/*This file can probably be deleted*/

// import React from 'react';
// import { connect } from 'react-redux';
// import { deleteUserOnServer } from '../../store';

// import UserForm from './UserForm';

// const UserInfo = (props) => {
//   const { user, deleteUser } = props;
//   if (!user) {
//     return null;
//   }
//   return (
//     <div>
//       <h3>User: {user.username}</h3>
//       <UserForm user={user} />
//       <button onClick={() => deleteUser(user.id)} className='btn btn-danger'>Delete user</button>
//     </div>
//   );
// }

// const mapState = ({ users }, { match }) => {
//   const id = match.params.id * 1;
//   const user = users.find(_user => _user.id === id);
//   return {
//     user
//   }
// }

// const mapDispatch = (dispatch) => {
//   return {
//     deleteUser: (userId) => dispatch(deleteUserOnServer(userId))
//   }
// }

// export default connect(mapState, mapDispatch)(UserInfo);
