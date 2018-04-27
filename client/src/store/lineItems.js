/* eslint-disable */
import axios from 'axios';
import { GET_LINE_ITEMS, CREATE_LINE_ITEM, UPDATE_LINE_ITEM, DELETE_LINE_ITEM } from './actionConstants';

/*********** ACTION CREATORS ***********/
const getLineItems = (items) => ({ type: GET_LINE_ITEMS, items });
const createLineItem = (item) => ({ type: CREATE_LINE_ITEM, item });
const updateLineItem = (item) => ({ type: UPDATE_LINE_ITEM, item });
const deleteLineItem = (id) => ({ type: DELETE_LINE_ITEM, id });

/*********** THUNKS ***********/
export const getLineItemsFromServer = () => {
  return (dispatch) => {
    return axios.get('/api/lineitems')
      .then( res => res.data)
      .then( items => dispatch(getLineItems(items)))
    // .catch(err) placeholder for error handling
  };
};

export const deleteLineItemFromServer = (id) => {
  return (dispatch) => {
    return axios.delete(`/api/lineitems/${id}`)
      .then(() => dispatch(deleteLineItem(id)))
      .then(() => location.hash = '/lineitems')
    // .catch(err) placeholder for error handling
  };
};

export const updateLineItemOnServer = (item) => {
  const { id } = item;
  const method = id ? 'put' : 'post';
  const url = id ? `/api/lineitems/${id}` : '/api/lineitems';
  const action = id ? updateLineItem : createLineItem
  return (dispatch) => {
    return axios[method](url, item)
      .then( res => res.data)
      .then( lineItem => dispatch(action(lineItem)))
      // .then(() => location.hash = '/lineitems' )
      // .catch(err) placeholder for error handling
  };
};

/*********** LINE ITEM REDUCER ***********/
const lineItemsReducer = (state = [], action) => {
  switch (action.type) {

    case GET_LINE_ITEMS:
      state = action.items
      break;

    case CREATE_LINE_ITEM:
      state = [...state, action.item]
      break;

    case DELETE_LINE_ITEM:
      state = state.filter(item => item.id !== action.id * 1)
      break;

    case UPDATE_LINE_ITEM:
      const items = state.filter(item => item.id !== action.item.id * 1)
      state = [...items, action.item]
      break;
  };
  return state;
};

export default lineItemsReducer;
