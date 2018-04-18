/* eslint-disable */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import categoriesReducer from './categories';
import lineitemsReducer from './lineItems';
import ordersReducer from './orders';
import productsReducer from './products';
import usersReducer from './users';

const reducer = combineReducers({
  categories: categoriesReducer,
  lineitems: lineitemsReducer,
  orders: ordersReducer,
  products: productsReducer,
  users: usersReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

export default store;

export * from './categories';
export * from './lineItems';
export * from './orders';
export * from './products';
export * from './users';
