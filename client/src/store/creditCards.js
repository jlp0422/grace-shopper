/* eslint-disable */
import axios from 'axios';
import { GET_CREDIT_CARDS, CREATE_CREDIT_CARD, UPDATE_CREDIT_CARD, DELETE_CREDIT_CARD } from './actionConstants';

/*********** ACTION CREATORS ***********/
const getCreditCards = (creditCards) => ({ type: GET_CREDIT_CARDS, creditCards });
const createCreditCard = (creditCard) => ({ type: CREATE_CREDIT_CARD, creditCard });
const updateCreditCard = (creditCard) => ({ type: UPDATE_CREDIT_CARD, creditCard });


/*********** THUNKS ***********/
export const getCreditCardsFromServer = () => {
  return (dispatch) => {
    return axios.get('/api/creditCards')
      .then(res => res.data)
      .then(creditCards => dispatch(getCreditCards(creditCards)))
      .catch(err => console.error(err))
  };
};

export const updateCreditCardOnServer = (creditCard) => {
  const { id } = creditCard;
  const method = id ? 'put' : 'post';
  const url = id ? `/api/creditCards/${id}` : '/api/creditCards';
  const action = id ? updateCreditCard : createCreditCard ;
  return (dispatch) => {
    return axios[method](url, creditCard)
      .then(res => res.data)
      .then(creditCard => dispatch(action(creditCard)))
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

    case UPDATE_CREDIT_CARD:
      state = [ ...state.filter(creditCard => creditCard.id === action.creditCard.id), action.creditCard ];
      break;

  }

  return state;
}

export default creditCardsReducer;
