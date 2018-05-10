/* eslint-disable */
import axios from 'axios';
import { GET_PROMOS, CREATE_PROMO, UPDATE_PROMO, DELETE_PROMO } from './actionConstants';

/*********** ACTION CREATORS ***********/
const getPromos = (promos) => ({ type: GET_PROMOS, promos });
const createPromo = (promo) => ({ type: CREATE_PROMO, promo });
const updatePromo = (promo) => ({ type: UPDATE_PROMO, promo });
const deletePromo = (id) => ({ type: DELETE_PROMO, id });

/*********** THUNKS ***********/
export const getPromosFromServer = () => {
  return (dispatch) => {
    return axios.get('/api/promos')
      .then(res => res.data)
      .then(promos => dispatch(getPromos(promos)))
      .catch(err => console.error(err))
  };
};

export const updatePromoOnServer = (promo) => {
  const { id } = promo;
  const method = id ? 'put' : 'post';
  const url = id ? `/api/promos/${id}` : '/api/promos';
  const action = id ? updatePromo : createPromo;
  return (dispatch) => {
    return axios[method](url, promo)
      .then(res => res.data)
      .then(pro => dispatch(action(pro)))
      .then(() => location.hash = '/promos')
      .catch(err => console.error(err))
  };
};

export const deletePromoOnServer = (id) => {
  return (dispatch) => {
    return axios.delete(`/api/promos/${id}`)
      .then(() => dispatch(deletePromo(id)))
      .then(() => location.hash = '/promos')
      .catch(err => console.error(err))
  };
};

/*********** PROMO REDUCER ***********/

const promosReducer = (state = [], action) => {
  switch (action.type) {
    case GET_PROMOS:
      state = action.promos;
      break;

    case CREATE_PROMO:
    state = [...state, action.promo]
    break;

  case DELETE_PROMO:
    state = state.filter(promo => promo.id !== action.id * 1)
    break;

  case UPDATE_PROMO:
    const promos = state.filter(promo => promo.id !== action.promo.id * 1)
    state = [...promos, action.promo]
    break;
};
return state;
};

export default promosReducer;

