import axios from 'axios';
import { GET_REVIEWS } from './actionConstants';

/*********** ACTION CREATORS ***********/
const getReviews = (reviews) => ({ type: GET_REVIEWS, reviews });

/*********** THUNKS ***********/

export const getReviewsFromServer = () => {
  return (dispatch) => {
    return axios.get('/api/reviews')
      .then(res => res.data)
      .then(reviews => dispatch(getReviews(reviews)))
      // .catch(err) placeholder for error handling
  }
}

// export const updateProductOnServer = (product) => {
//   const { id } = product;
//   const method = id ? 'put' : 'post';
//   const url = id ? `/api/products/${id}` : '/api/products';
//   const action = id ? updateProduct : createProduct
//   return (dispatch) => {
//     return axios[method](url, product)
//       .then(res => res.data)
//       .then(prod => dispatch(action(prod)))
//       .then(() => location.hash = '/products')
//     // .catch(err) placeholder for error handling
//   }
// }

// export const up

/*********** REVIEWS REDUCER ***********/

const reviewsReducer = (state = [], action) => {
  switch(action.type) {

    case GET_REVIEWS:
      state = action.reviews;
      break;

  }
  return state;
}


export default reviewsReducer;
