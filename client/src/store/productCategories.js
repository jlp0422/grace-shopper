import axios from 'axios';
import { GET_PRODUCT_CATEGORIES, CREATE_PRODUCT_CATEGORY } from './actionConstants';

/*********** ACTION CREATORS ***********/

const getProductCategories = (productCategories) => ({ type: GET_PRODUCT_CATEGORIES, productCategories });
const createProductCategory = (productCategory) => ({ type: CREATE_PRODUCT_CATEGORY, productCategory });

/*********** THUNKS ***********/

export const getProductCategoriesFromServer = () => {
  return (dispatch) => {
    return axios.get('/api/productCategories')
      .then(res => res.data)
      .then(productCategories => dispatch(getProductCategories(productCategories)))
      .catch(err => console.error(err))
  }
}

export const updateProductCategoryOnServer = (productCategory) => {
  return (dispatch) => {
    return axios.post('/api/productCategories', productCategory)
      .then(res => res.data)
      .then(productCategory => dispatch(createProductCategory(productCategory)))
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
