/* eslint-disable */
import React from 'react';
import { HashRouter as Router, Switch, Link, Route } from 'react-router-dom';
import { connect} from 'react-redux';
import { getCategoriesFromServer, getLineItemsFromServer, getOrdersFromServer, getProductsFromServer, getUsersFromServer, getUserFromToken, getAddressesFromServer, getReviewsFromServer, getProductCategoriesFromServer } from '../store';

import CheckAuth from './General/CheckAuth';
import Home from './General/Home';
import Nav from './General/Nav';
import Footer from './General/Footer';
import Categories from './Category/Categories';
import CategoryInfo from './Category/CategoryInfo';
import Products from './Product/Products';
import ProductInfo from './Product/ProductInfo';
import Users from './User/Users';
import UserNav from './User/UserNav';
import LoginForm from './User/LoginForm';
import ActiveOrder from './Order/ActiveOrder';
import PastOrders from './Order/PastOrders';
import Reviews from './Review/Reviews';
import UserForm from './User/UserForm';
import UserAccount from './User/UserAccount';
import Addresses from './Address/Addresses';
import CheckoutConfirm from './Checkout/CheckoutConfirm';
import ThankYou from './Checkout/ThankYou';

class App extends React.Component {
  componentDidMount() {
    const { getCategories, getProducts, getUsers, getOrders, getUser, getLineItems, getAddresses, getReviews, getProductCategories } = this.props;
    getCategories();
    getProducts();
    getUsers();
    getOrders();
    getUser();
    getLineItems();
    getAddresses();
    getReviews();
    getProductCategories();
  }

  render() {
    const UserNavAuth = CheckAuth(UserNav)
    const ReviewsAuth = CheckAuth(Reviews)
    const AddressesAuth = CheckAuth(Addresses)
    const UserAccountAuth = CheckAuth(UserAccount)
    return (
      <Router>
        <div>
          <Route path='/' component={ Nav } />
          <div className="container">
            <div id="body-elements">
              <Route path='/users/:id' render={({ match, history }) => (
                <UserNavAuth history={ history } id={ match.params.id * 1 } />
              )} />
              <Switch>
                <Route exact path='/' component={ Home } />
                {/* CATEGORY ROUTES */}
                <Route exact path='/categories' component={ Categories } />
                <Route exact path='/categories/:id' component={ CategoryInfo } />
                {/* PRODUCT ROUTES */}
                <Route exact path='/products' component={ Products } />
                <Route exact path='/products/:id' component={ ProductInfo } />
                <Route exact path='/products/:id/reviews' component={ ({ match }) => (
                  <Reviews page='product' id={ match.params.id * 1 } />
                 )} />
                {/* USER ROUTES */}
                <Route exact path='/users' component={ CheckAuth(Users) } />
                <Route exact path='/users/:id' render={({ match }) => (
                  <UserAccountAuth id={ match.params.id * 1} />
                )} />
                <Route exact path='/users/:id/cart' component={ CheckAuth(ActiveOrder) } />
                <Route exact path='/users/:id/orders' component={ CheckAuth(PastOrders) } />
                <Route exact path='/users/:id/cart/checkout' component={ CheckAuth(CheckoutConfirm) } />
                <Route exact path='/users/:id/cart/checkout/thankyou' component={ CheckAuth(ThankYou) } />
                <Route exact path='/users/:id/reviews' component={ ({ match }) => (
                  <ReviewsAuth page='user' id={ match.params.id * 1 } />
                )} />
                <Route exact path='/users/:id/addresses' render={({ match }) => (
                  <AddressesAuth id={ match.params.id } />
                )} />
                <Route exact path='/users/:id/edit' component={ CheckAuth(UserForm) } />
                {/* AUTH ROUTES */}
                <Route exact path='/login' component={ LoginForm } />
                <Route exact path='/signup' component={ LoginForm } />
              </Switch>
            </div>
          <Route component={ Footer } />
          </div>
        </div>
      </Router>
    )
  }
}

const mapDispatch = (dispatch) => {
  return {
    getCategories: () => dispatch(getCategoriesFromServer()),
    getProducts: () => dispatch(getProductsFromServer()),
    getUsers: () => dispatch(getUsersFromServer()),
    getOrders: () => dispatch(getOrdersFromServer()),
    getLineItems: () => dispatch(getLineItemsFromServer()),
    getAddresses: () => dispatch(getAddressesFromServer()),
    getReviews: () => dispatch(getReviewsFromServer()),
    getProductCategories: () => dispatch(getProductCategoriesFromServer()),
    getUser: () => {
      if (window.localStorage.getItem('token')) {
        dispatch(getUserFromToken(window.localStorage.getItem('token')))
      }
    }
  }
}

export default connect(null, mapDispatch)(App);
