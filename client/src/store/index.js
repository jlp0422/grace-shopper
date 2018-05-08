import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import categoriesReducer from './categories';
import lineItemsReducer from './lineItems';
import ordersReducer from './orders';
import productsReducer from './products';
import usersReducer from './users';
import userReducer from './user';
import addressesReducer from './addresses';
import reviewsReducer from './reviews';
import productCategoriesReducer from './productCategories';
import creditCardsReducer from './creditCards';

const reducer = combineReducers({
  categories: categoriesReducer,
  lineItems: lineItemsReducer,
  orders: ordersReducer,
  products: productsReducer,
  users: usersReducer,
  user: userReducer,
  addresses: addressesReducer,
  reviews: reviewsReducer,
  productCategories: productCategoriesReducer,
  creditCards: creditCardsReducer
});

const store = createStore(reducer, applyMiddleware(thunk))//, logger));

export default store;

export * from './categories';
export * from './lineItems';
export * from './orders';
export * from './products';
export * from './users';
export * from './user';
export * from './addresses';
export * from './reviews';
export * from './productCategories';
export * from './creditCards';
