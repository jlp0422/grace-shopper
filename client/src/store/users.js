/* eslint-disable */
import axios from 'axios';
import { GET_USERS, CREATE_USER, UPDATE_USER, DELETE_USER } from './actionConstants';
import { attemptLogin, getUserFromToken } from './user';

/*********** ACTION CREATORS ***********/
const getUsers = (users) => ({ type: GET_USERS, users });
const createUser = (user) => ({ type: CREATE_USER, user });
const updateUser = (user) => ({ type: UPDATE_USER, user });
const deleteUser = (id) => ({ type: DELETE_USER, id });

/*********** THUNKS ***********/
export const getUsersFromServer = () => {
  return (dispatch) => {
    return axios.get('/api/users')
      .then( res => res.data)
      .then( users => dispatch(getUsers(users)))
      // .catch(err) placeholder for error handling
  };
};

export const deleteUserOnServer = (id) => {
  return (dispatch) => {
    return axios.delete(`/api/users/${id}`)
      .then(() => dispatch(deleteUser(id)))
      .then(() => location.hash = '/admin/users')
      // .catch(err) placeholder for error handling
  };
};

export const updateUserOnServer = (user, page) => {
  const { id } = user;
  const method = id ? 'put' : 'post';
  const url = id ? `/api/users/${id}` : '/api/users';
  const action = id ? updateUser : createUser
  return (dispatch) => {
    return axios[method](url, user)
      .then( res => res.data)
      .then( u => {
        return dispatch(action(u))
      })
      .then( data => {
        const { username, password } = data.user
        if (page === 'signup') dispatch(attemptLogin({username, password}))
        if (page === 'admin') location.hash = '/admin/users'
      })
      // .catch(err) placeholder for error handling
  };
};

/*********** USERS REDUCER ***********/
const usersReducer = (state = [], action) => {
  switch(action.type) {

    case GET_USERS:
      state = action.users
      break;

    case CREATE_USER:
      state = [...state, action.user]
      break;

    case DELETE_USER:
      state = state.filter(user => user.id !== action.id * 1)
      break;

    case UPDATE_USER:
      const users = state.filter(user => user.id !== action.user.id * 1)
      state = [...users, action.user]
      break;
    };
    return state;
};

export default usersReducer;
