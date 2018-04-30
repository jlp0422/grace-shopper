/* eslint-disable */
import axios from 'axios';
import { GET_CREDIT_CARDS, CREATE_CREDIT_CARD, UPDATE_CREDIT_CARD, DELETE_CREDIT_CARD } from './actionConstants';

/*********** ACTION CREATORS ***********/
const getCreditCards = (creditCards) => ({ type: GET_CREDIT_CARDS, creditCards })

/*********** THUNKS ***********/
export const getCreditCardsFromServer = () => {
  return (dispatch) => {
    return axios.get('/api/creditCards')
      .then(res => res.data)
      .then(creditCards => dispatch(getCreditCards(creditCards)))
      .catch(err => console.error(err))
  };
};

/*********** CREDIT CARDS REDUCER ***********/
const creditCardsReducer = ( state = [], action ) => {
  switch(action.type) {

    case GET_CREDIT_CARDS:
      state = action.creditCards;
      break;
  }

  return state;
}

export default creditCardsReducer;
