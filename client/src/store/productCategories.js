import axios from 'axios';
import { GET_PRODUCT_CATEGORIES } from './actionConstants';

/*********** ACTION CREATORS ***********/

const getProductCategories = (productCategories) => ({ type: GET_PRODUCT_CATEGORIES, productCategories });

/*********** THUNKS ***********/

export const getProductCategoriesFromServer = () => {
  return (dispatch) => {
    return axios.get('/api/productCategories')
      .then(res => res.data)
      .then(productCategories => dispatch(getProductCategories(productCategories)))
      .catch(err => console.error(err))
  }
}

/*********** PRODUCT CATEGORIES REDUCER ***********/

const productCategoriesReducer = ( state = [], action ) => {
  switch(action.type) {

    case GET_PRODUCT_CATEGORIES:
      state = action.productCategories;
      break;

  }
  return state;
}

export default productCategoriesReducer;
