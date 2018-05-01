/* eslint-disable */
import axios from 'axios';
import { GET_CREDIT_CARDS, CREATE_CREDIT_CARD, DELETE_CREDIT_CARD } from './actionConstants';

/*********** ACTION CREATORS ***********/
const getCreditCards = (creditCards) => ({ type: GET_CREDIT_CARDS, creditCards });
const createCreditCard = (creditCard) => ({ type: CREATE_CREDIT_CARD, creditCard });
const deleteCreditCard = (id) => ({ type: DELETE_CREDIT_CARD, id })

/*********** THUNKS ***********/
export const getCreditCardsFromServer = () => {
  return (dispatch) => {
    return axios.get('/api/creditCards')
      .then(res => res.data)
      .then(creditCards => dispatch(getCreditCards(creditCards)))
      .catch(err => console.error(err))
  };
};

export const createCreditCardOnServer = (creditCard, page) => {
  return (dispatch) => {
    return axios.post('/api/creditCards', creditCard)
      .then(res => res.data)
      .then(creditCard => dispatch(createCreditCard(creditCard)))
      .then(() => {
        if (page === 'checkout') location.hash = `/users/${creditCard.userId}/checkout`
      })
      .catch(err => console.error(err))
  };
};

export const deleteCreditCardOnServer = (id) => {
  return (dispatch) => {
    return axios.delete(`/api/creditCards/${id}`)
      .then(() => dispatch(deleteCreditCard(id)))
      .catch(err => console.error(err))
  };
};

/*********** CREDIT CARDS REDUCER ***********/
const creditCardsReducer = ( state = [], action ) => {
  switch(action.type) {

    case GET_CREDIT_CARDS:
      state = action.creditCards;
      break;

    case CREATE_CREDIT_CARD:
      state = [ ...state, action.creditCard ];
      break;

    case DELETE_CREDIT_CARD:
      state = state.filter(creditCard => creditCard.id !== action.id)
      break;

  }

  return state;
}

export default creditCardsReducer;
