/* eslint-disable */
import axios from 'axios';
import { SET_USER } from './actionConstants';

const setUser = (user) => ({ type: SET_USER, user });

export const getUserFromToken = (token) => {
  return (dispatch) => {
    return axios.get(`/api/sessions/${token}`)
      .then( res => res.data)
      .then( user => dispatch(setUser(user)))
      // .then( user => location.hash = `/users/${user.id}`)

  }
}

export const attemptLogin = (credentials) => {
  return (dispatch) => {
    return axios.post('/api/sessions', credentials)
      .then( res => window.localStorage.setItem('token', res.data))
      .then( () => dispatch(getUserFromToken(window.localStorage.getItem('token'))))
      .then( () => location.hash = '/')
  }
}

export const logout = () => {
  return (dispatch) => {
    window.localStorage.removeItem('token');
    dispatch(setUser({}));
    location.hash = '/'
  }
}

export const updateLoggedUser = (user) => {
  return (dispatch) => {
    dispatch(setUser(user));
  }
}

const userReducer = (state = {}, action) => {
  switch(action.type) {

    case SET_USER:
      state = action.user
      break;

  };

  return state;
};

export default userReducer;
