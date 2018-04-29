import axios from 'axios';
import { GET_PRODUCT_CATEGORIES, UPDATE_PRODUCT_CATEGORIES } from './actionConstants';

/*********** ACTION CREATORS ***********/

const getProductCategories = (productCategories) => ({ type: GET_PRODUCT_CATEGORIES, productCategories });
export const updateProductCategories = (pcArray) => ({ type: UPDATE_PRODUCT_CATEGORIES, pcArray });
// const createProductCategory = (productCategory) => ({ type: CREATE_PRODUCT_CATEGORY, productCategory });


/*********** THUNKS ***********/

export const getProductCategoriesFromServer = () => {
  return (dispatch) => {
    return axios.get('/api/productCategories')
      .then(res => res.data)
      .then(productCategories => dispatch(getProductCategories(productCategories)))
      .catch(err => console.error(err))
  }
}

// export const updateProductCategoryOnServer = (productCategory) => {
//   console.log(productCategory)
//   return (dispatch) => {
//     return axios.post('/api/productCategories', productCategory)
//       .then(res => res.data)
//       .then(productCategory => {
//         console.log(productCategory)
//         dispatch(createProductCategory(productCategory))
//       })
//       .catch(err => console.error(err))
//   }
// }

/*********** PRODUCT CATEGORIES REDUCER ***********/

const productCategoriesReducer = ( state = [], action ) => {
  switch(action.type) {

    case GET_PRODUCT_CATEGORIES:
      state = action.productCategories;
      break;

    case UPDATE_PRODUCT_CATEGORIES:
      state = [...state, ...action.pcArray[0]]
      break;
  }
  return state;
}

export default productCategoriesReducer;
