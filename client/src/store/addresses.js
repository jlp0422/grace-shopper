/* eslint-disable */
import axios from 'axios';
import { GET_ADDRESSES, CREATE_ADDRESS, UPDATE_ADDRESS, DELETE_ADDRESS } from './actionConstants';

/*********** ACTION CREATORS ***********/
const getAddresses = (addresses) => ({ type: GET_ADDRESSES, addresses });
const createAddress = (address) => ({ type: CREATE_ADDRESS, address });
const updateAddress = (address) => ({ type: UPDATE_ADDRESS, address });
const deleteAddress = (id) => ({ type: DELETE_ADDRESS, id });

/*********** THUNKS ***********/
export const getAddressesFromServer = () => {
  return (dispatch) => {
    return axios.get('/api/addresses')
      .then(res => res.data)
      .then(addresses => dispatch(getAddresses(addresses)))
      .catch(err => console.error(err))
  };
};

export const deleteAddressFromServer = (id) => {
  return (dispatch) => {
    return axios.delete(`/api/addresses/${id}`)
      .then(() => dispatch(deleteAddress(id)))
      // .then(() => location.hash = '/addresses')
      .catch(err => console.error(err))
  };
};

export const updateAddressOnServer = (address, page) => {
  const { id } = address;
  const method = id ? 'put' : 'post';
  const url = id ? `/api/addresses/${id}` : '/api/addresses';
  const action = id ? updateAddress : createAddress
  return (dispatch) => {
    return axios[method](url, address)
      .then(res => res.data)
      .then(_address => {
        dispatch(action(_address))
        return _address
      })
      .then(() => {
        if (page === 'checkout') location.hash = `/users/${address.userId}/checkout`
      })
      // .then(_address => location.hash = `/users/${_address.userId}/addresses`)
      .catch(err => console.error(err))
  }
}

/*********** ADDRESS REDUCER ***********/
const addressesReducer = (state = [], action) => {
  switch (action.type) {

    case GET_ADDRESSES:
      state = action.addresses
      break;

    case CREATE_ADDRESS:
      state = [...state, action.address]
      break;

    case DELETE_ADDRESS:
      state = state.filter(address => address.id !== action.id * 1)
      break;

    case UPDATE_ADDRESS:
      const addresses = state.filter(address => address.id !== action.address.id * 1)
      state = [action.address, ...addresses]
      break;
  };
  return state;
};

export default addressesReducer;
