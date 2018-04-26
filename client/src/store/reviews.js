import axios from 'axios';
import { GET_REVIEWS, CREATE_REVIEW } from './actionConstants';

/*********** ACTION CREATORS ***********/
const getReviews = (reviews) => ({ type: GET_REVIEWS, reviews });
const createReview = (review) => ({ type: CREATE_REVIEW, review });

/*********** THUNKS ***********/

export const getReviewsFromServer = () => {
  return (dispatch) => {
    return axios.get('/api/reviews')
      .then(res => res.data)
      .then(reviews => dispatch(getReviews(reviews)))
      .catch(err => console.error(err))
  }
}

export const createReviewOnServer = (review) => {
  return (dispatch) => {
    return axios.post('/api/reviews', review)
      .then(res => res.data)
      .then(review => dispatch(createReview(review)))
      .catch(err => console.error(err))
  }
}

/*********** REVIEWS REDUCER ***********/

const reviewsReducer = ( state = [], action ) => {
  switch(action.type) {

    case GET_REVIEWS:
      state = action.reviews;
      break;

    case CREATE_REVIEW:
      state = [ ...state, action.review ];
      break;

  }
  return state;
}


export default reviewsReducer;
