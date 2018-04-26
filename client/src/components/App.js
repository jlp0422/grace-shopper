/* eslint-disable */
import React from 'react';
import { HashRouter as Router, Switch, Link, Route } from 'react-router-dom';
import { connect} from 'react-redux';
import { getCategoriesFromServer, getLineItemsFromServer, getOrdersFromServer, getProductsFromServer, getUsersFromServer, getUserFromToken, getAddressesFromServer, getReviewsFromServer, getProductCategoriesFromServer } from '../store';

import CheckAuth from './CheckAuth';
import Home from './Home';
import Nav from './Nav';
import Footer from './Footer';
import Categories from './Category/Categories';
import CategoryInfo from './Category/CategoryInfo';
import Products from './Product/Products';
import ProductInfo from './Product/ProductInfo';
import Users from './User/Users';
import UserAccount from './User/UserAccount';
import LoginForm from './User/LoginForm';
import ActiveOrder from './Order/ActiveOrder';
import PastOrders from './Order/PastOrders';
import Reviews from './Review/Reviews';
import UserForm from './User/UserFormNEW';
import Addresses from './Address/Addresses';


// const authAccount = CheckAuth(Nav)

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
    return (
      <Router>
        <div>
          <Route path='/' component={ Nav } />
          <div className="container">
            <div id="body-elements">
              <Route path='/users/:id' render={({ match, history }) => (
                  <UserAccount history={ history } id={ match.params.id * 1 } />
              )} />
              <Switch>
                <Route exact path='/' component={ Home } />
                {/* CATEGORY ROUTES */}
                <Route exact path='/categories' component={ Categories } />
                <Route exact path='/categories/:id' component={ CategoryInfo } />
                <Route exact path='/products' component={ Products } />
                {/* PRODUCT ROUTES */}
                <Route exact path='/products/:id' component={ ProductInfo } />
                <Route exact path='/products/:id/reviews' component={ ({ match }) => <Reviews page='product' id={ match.params.id * 1 } /> } />
                {/* USER ROUTES */}
                <Route exact path='/users' component={ Users } />
                <Route exact path='/users/:id/cart' component={ ActiveOrder } />
                <Route exact path='/users/:id/orders' component={ PastOrders } />
                <Route exact path='/users/:id/reviews' component={ ({ match }) => <Reviews page='user' id={ match.params.id * 1 } /> } />
                <Route exact path='/users/:id/addresses' render={({match}) => (
                  <Addresses id={ match.params.id } />
                )} />
                <Route exact path='/users/:id/edit' component={ UserForm } />

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
