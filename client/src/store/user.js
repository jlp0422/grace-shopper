/* eslint-disable */
import axios from 'axios';
import { SET_USER, CLEAR_USER } from './actionConstants';

const setUser = (user) => ({ type: SET_USER, user })

export const getUserFromToken = (token) => {
  return (dispatch) => {
    return axios.get(`/api/sessions/${token}`)
      .then( res => res.data)
      .then( user => dispatch(setUser(user)))
  }
}

export const attemptLogin = (credentials) => {
  return (dispatch) => {
    return axios.post('/', credentials)
      .then( res => window.localStorage.setItem('token', res.data))
      .then( () => dispatch(getUserFromToken(window.localStorage.getItem('token'))))
  }
}

export const logout = () => {
  return (dispatch) => {
    window.localStorage.removeItem('token');
    dispatch(setUser({}))
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
