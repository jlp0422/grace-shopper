/* eslint-disable */
import axios from 'axios';
import { GET_PRODUCTS, CREATE_PRODUCT, UPDATE_PRODUCT, DELETE_PRODUCT } from './actionConstants';
// import { getProductCategoriesFromServer, updateProductCategories } from './productCategories';

/*********** ACTION CREATORS ***********/
const getProducts = (products) => ({ type: GET_PRODUCTS, products });
const createProduct = (product) => ({ type: CREATE_PRODUCT, product });
const updateProduct = (product) => ({ type: UPDATE_PRODUCT, product });
const deleteProduct = (id) => ({ type: DELETE_PRODUCT, id });

/*********** THUNKS ***********/
export const getProductsFromServer = () => {
  return (dispatch) => {
    return axios.get('/api/products')
      .then( res => res.data)
      .then( products => dispatch(getProducts(products)))
      // .catch(err) placeholder for error handling
  };
};

export const deleteProductFromServer = (id) => {
  return (dispatch) => {
    return axios.delete(`/api/products/${id}`)
      .then(() => dispatch(deleteProduct(id)))
      .then(() => location.hash = '/products')
      // .catch(err) placeholder for error handling
  }
}

export const updateProductOnServer = (product) => {
  const { id } = product;
  const method = id ? 'put' : 'post';
  const url = id ? `/api/products/${id}` : '/api/products';
  const action = id ? updateProduct : createProduct
  return (dispatch) => {
    return axios[method](url, product)
      .then(res => res.data)
      .then(prod => {
        // console.log(prod)
        const { product, pcArray } = prod
        dispatch(action(product))
        // dispatch(updateProductCategories(pcArray))
      })
      .then(() => location.hash = '/products')
    // .catch(err) placeholder for error handling
  }
}

/*********** PRODUCT REDUCER ***********/
const productsReducer = (state = [], action) => {
  switch(action.type) {

    case GET_PRODUCTS:
      state = action.products
      break;

    case CREATE_PRODUCT:
      state = [...state, action.product]
      break;

    case DELETE_PRODUCT:
      state = state.filter(product => product.id !== action.id * 1)
      break;

    case UPDATE_PRODUCT:
      const products = state.filter(product => product.id !== action.product.id * 1)
      state = [...products, action.product ]
      break;
  };
  return state;
};

export default productsReducer;
