/* eslint-disable */
import React from 'react';
import { HashRouter as Router, Switch, Link, Route } from 'react-router-dom';
import { connect} from 'react-redux';
import { getCategoriesFromServer, getLineItemsFromServer, getOrdersFromServer, getProductsFromServer, getUsersFromServer, getUserFromToken } from '../store';

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
// import UserForm from './User/UserFormNEW';

// const authAccount = CheckAuth(Nav)

class App extends React.Component {
  componentDidMount() {
    const { getCategories, getProducts, getUsers, getOrders, getUser, getLineItems } = this.props;
    getCategories();
    getProducts();
    getUsers();
    getOrders();
    getUser();
    getLineItems();
  }

  render() {
    return (
      <Router>
        <div>
          <Route path='/' component={Nav} />
          <div className="container">
          <Switch>
            <Route exact path='/' component={Home} />
            {/* CATEGORY ROUTES */}
            <Route exact path='/categories' component={Categories} />
            <Route exact path='/categories/:id' component={CategoryInfo} />
            <Route exact path='/products' component={Products} />
            {/* PRODUCT ROUTES */}
            <Route exact path='/products/:id' component={ProductInfo} />
            {/* USER ROUTES */}
            <Route exact path='/users' component={Users} />
            <Route exact path='/users/:id' render={({ match }) => (
              <UserAccount id={ match.params.id } />
            )}/>

            {/* AUTH ROUTES */}
            <Route exact path='/login' component={LoginForm} />
            <Route exact path='/signup' component={LoginForm} />
          </Switch>
          <Route component={Footer} />
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
    getUser: () => {
      if (window.localStorage.getItem('token')) {
        dispatch(getUserFromToken(window.localStorage.getItem('token')))
      }
    }
  }
}

export default connect(null, mapDispatch)(App);
