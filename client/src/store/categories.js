/* eslint-disable */
import axios from 'axios';
import { GET_CATEGORIES, CREATE_CATEGORY, UPDATE_CATEGORY, DELETE_CATEGORY } from './actionConstants';

/*********** ACTION CREATORS ***********/
const getCategories = (categories) => ({ type: GET_CATEGORIES, categories });
const createCategory = (category) => ({ type: CREATE_CATEGORY, category });
const updateCateogry = (category) => ({ type: UPDATE_CATEGORY, category });
const deleteCategory = (id) => ({ type: DELETE_CATEGORY, id })

/*********** THUNKS ***********/
export const getCategoriesFromServer = () => {
  return (dispatch) => {
    return axios.get('/api/categories')
      .then( res => res.data)
      .then( categories => dispatch(getCategories(categories)))
      // .catch(err) placeholder for error handling
  }
}

export const deleteCampusOnServer = (id) => {
  return (dispatch) => {
    return axios.delete(`/api/categories/${id}`)
      .then(() => dispatch(deleteCategory(id)))
      .then(() => location.has = '/categories')
      // .catch(err) placeholder for error handling
  }
}

/*********** CATEGORY REDUCER ***********/
const categoriesReducer = (state = [], action) => {
  switch(action.type) {

    case GET_CATEGORIES:
      state = action.categories
      break;

    case CREATE_CATEGORY:
      state = [...state, action.category]
      break;

    case DELETE_CATEGORY:
      state = state.filter(category => category.id !== action.id * 1)
      break;

    case UPDATE_CATEGORY:
      const categories = state.filter(category => category.id !== action.id * 1)
      state = [...categories, action.category]
      break;
  }
  return state
}

export default categoriesReducer;
