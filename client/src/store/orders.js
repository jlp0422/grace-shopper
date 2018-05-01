/* eslint-disable */
import axios from 'axios';
import { GET_ORDERS, CREATE_ORDER, UPDATE_ORDER, DELETE_ORDER } from './actionConstants';

/*********** ACTION CREATORS ***********/
const getOrders = (orders) => ({ type: GET_ORDERS, orders });
const createOrder = (order) => ({ type: CREATE_ORDER, order });
const updateOrder = (order) => ({ type: UPDATE_ORDER, order });
const deleteOrder = (id) => ({ type: DELETE_ORDER, id });

/*********** THUNKS ***********/
export const getOrdersFromServer = () => {
  return (dispatch) => {
    return axios.get('/api/orders')
      .then(res => res.data)
      .then(orders => dispatch(getOrders(orders)))
    // .catch(err) placeholder for error handling
  };
};

export const deleteOrderFromServer = (id, page) => {
  return (dispatch) => {
    return axios.delete(`/api/orders/${id}`)
      .then(() => dispatch(deleteOrder(id)))
      .then(() => {
        if (page === 'admin') return location.hash = '/admin/orders'
      })
    // .catch(err) placeholder for error handling
  };
};

export const updateOrderOnServer = (order, page) => {
  const { id } = order;
  const method = id ? 'put' : 'post';
  const url = id ? `/api/orders/${id}` : '/api/orders';
  const action = id ? updateOrder : createOrder
  return (dispatch) => {
    return axios[method](url, order)
      .then(res => res.data)
      .then(ord => dispatch(action(ord)))
      .then(() => {
        if (page === 'admin') return location.hash = '/orders'
      })
    // .catch(err) placeholder for error handling
  }
}

/*********** ORDER REDUCER ***********/
const ordersReducer = (state = [], action) => {
  switch (action.type) {

    case GET_ORDERS:
      state = action.orders
      break;

    case CREATE_ORDER:
      state = [...state, action.order]
      break;

    case DELETE_ORDER:
      state = state.filter(order => order.id !== action.id * 1)
      break;

    case UPDATE_ORDER:
      const orders = state.filter(order => order.id !== action.order.id * 1)
      state = [...orders, action.order]
      break;
  };
  return state;
};

export default ordersReducer;
